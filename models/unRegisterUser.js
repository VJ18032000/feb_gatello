const mongoose = require('mongoose')

const unregisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('unregisterUser', unregisterSchema)

