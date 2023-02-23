const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: false,
        default:""
    },
    cover_url: {
        type: String,
        required: false,
        default:""
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: false,
        default:""
    },
    designation: {
        type: String,
        required: false,
        default:""
    },
    city: {
        type: String,
        required: false,
        default:""
    },
    company: {
        type: String,
        required: false,
        default:""
    },
    job: {
        type: String,
        required: false,
        default:""
    },
    college: {
        type: String,
        required: false,
        default:""
    },
    high_school: {
        type: String,
        required: false,
        default:""
    },
    interest: {
        type: String,
        required: false,
        default:""
    },
    relationship_status: {
        type: String,
        required: false,
        default:""
    },
    about: {
        type: String,
        required: false,
        default:""
    },
    member: {
        type: String,
        required: false
    },
    email: {
        type: String,
         required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    is_Logged_in: {
        type: Boolean,
        required: false,
        default:1
    },
    my_feeds: {
        type: Array,
        required: false,
        default:""
    },
    following_count: {
        type: Number,
        required: false,
        default:0
    },
    followers_count: {
        type: Number,
        required: false,
        default:0
    },
    posts_count: {
        type: Number,
        required: false,
        default:0
    },
    space_used: {
        type: Number,
        required: false,
        default:0
    },
    root_folder_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto:true
    },
    notification_token:{
        type: String,
        required: false,
        default:""
    },
    gender: {
        type: String,
        required: false,
        default:""
    },
    language_known: {
        type: Array,
        required: false,
        default:""
    },
    website: {
        type: Array,
        required: false,
        default:""
    },
    work_experience: [{
        companyName: {
            type: String,
            required: false,
            default:""
        },
        location: {
            type: String,
            required: false,
            default:""
        },
        position: {
            type: String,
            required: false,
            default:""
        },
        startDate: {
            type: String,
            required: false,
            default:""
        },
        endDate: {
            type: String,
            required: false,
            default:""
        }
    }],
    skills: {
        type: Array,
        required: false,
        default:""
    },

})

module.exports = mongoose.model('user', userSchema)