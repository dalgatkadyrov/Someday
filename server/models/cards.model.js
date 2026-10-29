import mongoose from "mongoose";

const { Schema } = mongoose

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        required: true,
        type: String
    },
    image: {
        type: String
    },
    imagePublicId: {
        type: String
    },
    sortByNum: {
        required: true,
        type: Number
    },
    completed: {
        type: Boolean
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })

export default mongoose.model('Card', cardSchema)



