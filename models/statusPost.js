const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    status_post: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false
    },
    status_text: {
        type: String,
        required: false
    },
    view_details: [{
        viewed_by:{
            type: String,
            required: true
        },
        viewed_time:{
            type: Date,
            required:false
        }
       
    }],
    font_style:{
        type: String,
        required:false
    },
    background_color:{
        type: String,
        required:false
    },
    font_color:{
        type: String,
        required:false
    },
    profile_url:{
        type: String,
        required:false
    },
     username:{
        type: String,
        required:false
    },
    createdAt: { type: Date, expires: '1440m', default: Date.now }
})


module.exports = mongoose.model('status', statusSchema)

