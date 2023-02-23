const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController')
const upload = require('../middleware/statusUpload')

router.post('/create/status',upload.single('status_post'),statusController.createStatus)
router.delete('/delete/status',statusController.deletelStatus)
router.post('/userview/status',statusController.userviewStatus)
router.post('/allstatus/status',statusController.allstatusDetails)
router.post('/status/status',statusController.statusDeails)


module.exports = router;
