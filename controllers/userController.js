const User = require('../models/userModel')
const axios = require('axios')


const register = (req, res, next) => {
    const params = {
        "username": req.body.username,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    }
    axios.post("http://app.gatello.com:9090/plugins/restapi/v1/users", params, {
        headers: {
            'Authorization': 'fih6cj957mHWEcQk',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log('Success')
    }).catch((err) => { console.log(err); })

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        member: req.body.member,
        phone: req.body.phone,
        user_id: req.body.user_id,
        dob: req.body.dob,
        designation: req.body.designation,
        city: req.body.city,
        company: req.body.company,
        high_school: req.body.high_school,
        interest: req.body.interest,
        relationship_status: req.body.relationship_status,
        about: req.body.about,
        job: req.body.job,
        college: req.body.college,
        gender: req.body.gender,
        language_known: req.body.language_known,
        website: req.body.website,
        companyName: req.body.companyName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: req.body.skills,
    })
    if (req.file) {
        user.profile_url = req.file.path
    }
    user.save()
        .then(user => {
            const resdata = {
                "status": "OK",
                "message": "signed up successfully",
                "result": {
                    "inserted_id": `${user.id}`,
                    "root_folder_id": `${user.root_folder_id}`
                },
                "error": {}
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": `${err.message}`,
                "result": {},
                "errors": "validation error"
            }
            res.json(resdata)
        })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ username: username }, { phone: username }] })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    const resdata = {
                        "status": "OK",
                        "message": "loggedin successfully",
                        "result": {
                            "user_id": `${user.user_id}`,
                            "email": `${user.email}`,
                            "username": `${user.username}`,
                            "root_folder_id": `${user.root_folder_id}`
                        },
                        "error": {}
                    }
                    user.is_Logged_in = 1
                    user.save()
                    res.send(resdata)
                } else {
                    const resdata = {
                        "status": "ERROR",
                        "message": "invalid password",
                        "result": {},
                        "error": {}
                    }
                    res.json(resdata)
                }
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "invalid phonenumber",
                    "result": {},
                    "error": {}
                }
                res.send(resdata)
            }
        })
}

const logout = (req, res, next) => {
    var user_id = req.body.user_id

    User.findOne({ user_id: user_id })
        .then(user => {
            if (user) {
                const resdata = {
                    "status": "OK",
                    "message": "user logged out successfully",
                    "result": {},
                    "errors": {}
                }
                user.is_Logged_in = 0
                user.save()
                res.send(resdata)
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "something went wrong",
                    "result": {},
                    "errors": {}
                }
                res.send(resdata)
            }
        })
}

const forgotpassword = (req, res, next) => {
    var user_id = req.body.user_id

    User.findOne({ user_id: user_id })
        .then(user => {
            if (user) {
                user.password = req.body.password
                user.save()
                const resdata = {
                    "status": "OK",
                    "message": "password updated successfully",
                    "result": {},
                    "errors": {}
                }
                res.send(resdata)
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "Please check User id & change password",
                    "result": {},
                    "errors": {}
                }
                res.send(resdata)
            }
        })
}

const editprofile = (req, res, next) => {
    const user_id = req.body.user_id
    const work_experience = {
        work_experience: req.body.work_experience,
        companyName: req.body.companyName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        position: req.body.position
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        member: req.body.member,
        phone: req.body.phone,
        dob: req.body.dob,
        designation: req.body.designation,
        city: req.body.city,
        company: req.body.company,
        high_school: req.body.high_school,
        interest: req.body.interest,
        relationship_status: req.body.relationship_status,
        about: req.body.about,
        job: req.body.job,
        college: req.body.college,
        gender: req.body.gender,
        language_known: req.body.language_known,
        website: req.body.website,
        skills: req.body.skills,
        ...work_experience
    }
    User.updateMany({ user_id }, { $set: user })
        .then(result => {
            if (result.modifiedCount) {
                const resdata = {
                    "status": "OK",
                    "message": "profile details updated successfully",
                    "result": {},
                    "error": {}
                }
                res.send(resdata)
            }
            else if (result.acknowledged === false) {
                const resdata = {
                    "status": "ERROR",
                    "message": "Something went wrong",
                    "result": {},
                    "error": "validation error"
                }
                res.send(resdata)
            }
            else {
                const resdata = {
                    "status": "OK",
                    "message": "Already exists!",
                    "result": {},
                    "error": {}
                }
                res.send(resdata)
            }

        }).catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": {},
                "error": "{}"
            }
            res.send(resdata)
        })
}

const userdetails = (req, res, next) => {

    User.findOne({ user_id: req.body.user_id })
        .then(user => {
            const resdata = {
                "status": "OK",
                "message": "user details",
                "result": {
                    "_id": `${user.id}`,
                    "user_id": `${user.user_id}`,
                    "profile_url": `${user.profile_url}`,
                    "username": `${user.username}`
                },
                "error": {}
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": {},
                "errors": {}
            }
            res.send(resdata)
        })
}

const updateuser = (req, res, next) => {
    var user_id = req.body.user_id

    User.findOne({ user_id: user_id })
        .then(user => {
            if (user) {
                user.username = req.body.username
                user.save()
                const resdata = {
                    "status": "OK",
                    "message": "profile details updated successfully",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "Something went wrong",
                    "result": {},
                    "errors": {}
                }
                res.json(resdata)
            }
        })
}

const updateimage = (req, res, next) => {
    const user_id = req.body.user_id
    User.findOne({ user_id: user_id })
        .then(user => {
            user.profile_url = req.file.path
            user.save()
            const resdata = {
                "status": "OK",
                "message": "Successfully updated profile picture",
                "result": user.profile_url,
                "errors": {}
            }
            res.send(resdata)

        }).catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result": { err },
                "errors": {}
            }
            res.send(resdata)
        })
}

const verifyUser = (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;

    User.findOne()
        .then(data => {
            if (data.username === username && data.email === email && data.phone === phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "username / email / phone already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username !== username && data.email !== email && data.phone === phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "phone already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username === username && data.email !== email && data.phone !== phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "username already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username !== username && data.email === email && data.phone !== phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "email already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username !== username && data.email === email && data.phone === phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "email/phone already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username === username && data.email !== email && data.phone === phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "username/phone already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else if (data.username === username && data.email === email && data.phone !== phone) {
                const resdata = {
                    "status": "ERROR",
                    "message": "username/email already exits",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            } else {
                const resdata = {
                    "status": "OK",
                    "message": "successfully verified",
                    "result": {},
                    "error": {}
                }
                res.json(resdata)
            }
        }).catch(err => res.json(err))
}

const coverimage = (req, res, next) => {
    const user_id = req.body.user_id
    User.findOne({ user_id: user_id })
        .then(user => {
            user.cover_url = req.file.path
            user.save()
            const resdata = {
                "status": "OK",
                "message": "Successfully updated cover_url",
                "result": user.cover_url,
                "errors": {}
            }
            res.send(resdata)
        }).catch(err => {
            const resdata = {
                "status": "OK",
                "message": "Something is error...!",
                "result": {},
                "errors": err
            }
            res.send(resdata)
        })
}
const database = (req, res, next) => {
    User.find()
        .then(status => {
            const resdata = {
                "status": "OK",
                "message": "All data in database",
                "data": status
            }
            res.json(status)
        })
        .catch(err => {
            res.json({ err })
        })
}
const deleteUser = (req, res, next) => {
    var user_id = req.body.user_id
    const username = req.body.username
    axios.delete(`http://app.gatello.com:9090/plugins/restapi/v1/users/${username}`, {
        headers: {
            'Authorization': 'fih6cj957mHWEcQk',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(`Deleted successfully ${username}`)
    }).catch((err) => { console.log(err); })

    User.findOneAndRemove({ user_id: user_id })
        .then(user => {
            user.remove()
            const resdata = {
                "status": "OK",
                "message": "Account Successfully delete",
                "result": user
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong ",
                "result": "{}",
                "error": err
            }
            res.json(resdata)
        })
}
const viewProfile = (req, res, next) => {
    var user_id = req.body.user_id
    User.find({ user_id: user_id })
        .then(result => {
            const resdata = {
                "status": "OK",
                "message": "user details",
                "result": { "profile_details": result[0], "isFollowing": false },
                "error": {}
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong ",
                "result": "{}",
                "error": err
            }
            res.json(resdata)
        })
}

const group = (req, res, next) => {
    const params = {
        "name": req.body.name,
        "description":req.body.description,
        "members": req.body.members, //array
        "admins": req.body.admins,  //array
        "shared": true
    }

    axios.post("http://app.gatello.com:9090/plugins/restapi/v1/groups", params, {
        headers: {
            'Authorization': 'fih6cj957mHWEcQk',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send('Success group created')
    }).catch((err) => { res.send(err); })
}
const room=(req,res,next)=>{
    const params = {
           "roomName":req.body.roomName,
           "naturalName":req.body.naturalName,
           "description":req.body.description,
           "owners":req.body.owners, //array
           "members":req.body.members, //array
           "subject":req.body.subject,
    }

    axios.post("http://app.gatello.com:9090/plugins/restapi/v1/chatrooms", params, {
        headers: {
            'Authorization': 'fih6cj957mHWEcQk',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send('room group created')
    }).catch((err) => { res.send(err); })
}

module.exports = {
    register, group,room,
    login,
    logout,
    forgotpassword,
    editprofile,
    userdetails,
    updateuser,
    updateimage,
    verifyUser,
    coverimage,
    database,
    deleteUser,
    viewProfile
} 