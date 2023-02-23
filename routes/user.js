const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/userController')
const upload = require('../middleware/upload')
const cover= require('../middleware/coverUpload')


router.post('/signup', upload.single('profile_url'),AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotpassword)
router.post('/edit/profile', AuthController.editprofile)
router.post('/user/details', AuthController.userdetails)
router.post('/update/username', AuthController.updateuser)
router.post('/update/profilePic', upload.single('profile_url'),AuthController.updateimage)
router.post('/update/coverPic', cover.single('cover_url'),AuthController.coverimage)
router.post('/verify/user', AuthController.verifyUser)
router.post('/database', AuthController.database)
router.delete('/user/delete', AuthController.deleteUser)
router.post('/view/profile', AuthController.viewProfile)
router.post('/group', AuthController.group)
router.post('/room', AuthController.room)


module.exports = router