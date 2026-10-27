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
    // image: {

    // },
    sortByNum: {
        required: true,
        type: Number

    },
    completed: {
        type: Boolean
    }


}, { timestamps: true })

export default mongoose.model('Card', cardSchema)



