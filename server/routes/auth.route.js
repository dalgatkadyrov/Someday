import express from 'express'
import argon2 from 'argon2'
import User from '../models/users.model.js'

const router = express.Router()



router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name?.trim() || !email?.trim() || !password.trim()) {
            return res.status(400).json({ error: 'Fill all fields' })
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password must contain at least 8 symbols'
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const existingUser = await User.findOne({ email: normalizedEmail })

        if (existingUser) {
            return res.status(409).json({ error: 'This email already exists' })
        }

        const passwordHash = await argon2.hash(password)

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash
        })

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        //protection from 2 registrations with the same email at the same time
        if (error.code === 11000) {
            return res.status(409).json({ error: 'This email already exists' })
        }

        res.status(500).json({ error: 'Could not create user' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase()
        const { password } = req.body

        const user = await User.findOne({ email })

        if (!user || !(await argon2.verify(user.passwordHash, password))) {
            return res.status(401).json({ error: 'Wrong email or password' })
        }

        req.session.userId = user._id.toString()

        const keepLogin = req.body.keepLogin === true
        req.session.cookie.maxAge = keepLogin ? 30 * 24 * 60 * 60 * 1000 //30 days
            : null

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch {
        res.status(500).json({ error: 'Could not complete log in' })
    }
})

router.post('/logout', (req, res) => [
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ error: 'Could not log out' })
        }

        res.clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        res.status(204).end()
    })
])

router.get('/me', async (req, res) => {
    if (!req.session?.userId) {
        return res.status(401).json({ error: 'Not logged in' })
    }

    try {
        const user = await User.findById(req.session.userId).select('name email')

        if (!user) {
            return res.status(401).json({ error: 'Not logged in' })
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        res.status(500).json({ error: 'Could not check session' })
    }
})

export default router
