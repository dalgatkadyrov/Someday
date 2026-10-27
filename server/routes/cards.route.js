import express from 'express'
import mongoose from 'mongoose'
import Card from '../models/cards.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const cards = await Card.find().sort({ createdAt: -1 })
        res.status(200).json(cards)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { title, description, category, sortByNum, completed } = req.body
    try {
        const card = await Card.create({ title, description, category, sortByNum, completed })
        res.status(200).json(card)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No card' })

    try {
        const card = await Card.findByIdAndDelete(id)
        if (!card)
            return res.status(404).json({ error: 'No card' })

        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No card' })

    try {
        const card = await Card.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true, runValidators: true })

        if (!card)
            return res.status(404).json({ error: 'No card' })

        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



export default router

