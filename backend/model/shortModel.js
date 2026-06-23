import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messgae: {
        type: String,
        required: true
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { _id: true })

const comments = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messgae: {
        type: String,
        required: true

    },
    replies: { replySchema },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { _id: true })

const shortSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    tittle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    shortUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    saveBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: { commentSchama }

},
    { timestamps: true })

const Short = mongoose.model("Short", ShortSchema)

export default Short;