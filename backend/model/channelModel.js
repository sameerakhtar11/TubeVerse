import mongoose from "mongoose"

const channelSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    videos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Video"
        }
    ],
    subscribers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    shorts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Short"
    }],

    playlists: [{
        type: mongoose.Schema.ObjectId,
        ref: "Playlist"
    }],
    communityPosts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ]


}, { timestamps: true })

const Channel = mongoose.model("Channel", channelSchema)
export default Channel;