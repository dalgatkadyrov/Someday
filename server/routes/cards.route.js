import express from 'express'
import mongoose from 'mongoose'
import Card from '../models/cards.model.js'
import cloudinary from '../config/cloudinary.js'
import multer from 'multer';

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
        if (file.mimetype.startsWith('image/')) return callback(null, true)
        callback(new Error('Only image files are allowed'))
    },
})


const uploadImage = (buffer) =>
    new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'cards' },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        ).end(buffer)
    })

router.use((req, res, next) => {
    if (!req.session?.userId) {
        return res.status(401).json({ error: 'Login first' })
    }

    next()
})




router.get('/', async (req, res) => {
    try {
        const cards = await Card.find({ owner: req.session.userId })
        res.status(200).json(cards)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


router.post('/', upload.single('image'), async (req, res) => {

    // const { title, description, category, image, sortByNum, completed } = 

    try {
        const result = req.file ? await uploadImage(req.file.buffer) : null

        const card = await Card.create({
            ...req.body,
            owner: req.session.userId,
            sortByNum: Number(req.body.sortByNum),
            completed: req.body.completed === 'true',
            image: result?.secure_url,
            imagePublicId: result?.public_id
        })
        res.status(201).json(card)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No card' })

    try {
        const card = await Card.findOne({
            _id: id,
            owner: req.session.userId
        })
        if (!card)
            return res.status(404).json({ error: 'No card' })

        if (card.imagePublicId) {
            await cloudinary.uploader.destroy(card.imagePublicId)
        }
        await Card.findOneAndDelete({ _id: id, owner: req.session.userId })
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
        const card = await Card.findOneAndUpdate(
            { _id: id, owner: req.session.userId },
            { $set: { completed: req.body.completed } },
            { new: true, runValidators: true }
        )

        if (!card)
            return res.status(404).json({ error: 'No card' })

        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



export default router

