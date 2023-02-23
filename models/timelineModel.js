const mongoose = require('mongoose')

const timelineSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    timeline: {
        type: Array,
        required: true
    },
    timeline_array: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('timeline', timelineSchema)

