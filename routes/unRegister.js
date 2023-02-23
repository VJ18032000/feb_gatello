const express = require('express')
const router = express.Router()
const unRegisterController = require('../controllers/unregisterController')


router.post('/create/unregister',unRegisterController.createUnregister)
router.delete('/delete/unregister',unRegisterController.deletelUnregister)
router.post('/view/unregister',unRegisterController.allUnregister)



module.exports = router;
