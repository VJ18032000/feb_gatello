const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    posted_by: {
        user_id: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true
    },
    is_expanded: {
        type: Boolean,
        default: false
    },
    replies: [{
        user_id: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: false
        },
        profile_pic: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
    }],
}, { timestamps: true })

module.exports = mongoose.model('comment', commentSchema)

