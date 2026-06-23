import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
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
    videos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Video"
        }
    ],
    saveBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

},
    { timestamps: true })

const Playlist = mongoose.model("Playlist", PlaylistSchema)

export default Playlist;