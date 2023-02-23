const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: {
        type: Array,
        required: true
    },
    likes_count: {
        type: Number,
        required: false,
        default:0
    },
    comments_count: {
        type: Number,
        required: false,
        default:0
    },
    current_page: {
        type: Number,
        required: false,
        default:0
    }
},{timestamps: true})

module.exports = mongoose.model('post', postSchema)

