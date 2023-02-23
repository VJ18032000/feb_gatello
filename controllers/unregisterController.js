const Unregister = require('../models/unRegisterUser')

const createUnregister = (req, res, next) => {
    const unregister = new Unregister({
       name:req.body.name,
       dob:req.body.dob,
       phone:req.body.phone
    })
   unregister.save()
   .then((result)=>{
    const resdata = {
        "status": "OK",
        "message": "Inserted successfully",
        "result": result,
        "error":"{}"
    }
    res.json(resdata)
   })
   .catch((err)=>{
    const resdata = {
        "status": "ERROR",
        "message": "Something went wrong",
        "result":"{}",
        "error": err
    }
    res.json(resdata)
   })
}

const deletelUnregister = (req, res, next) => {
    var id = req.body.id

    Unregister.findOneAndRemove({_id:id})
    .then(result=>{
        result.remove()
        const resdata = {
            "status": "OK",
            "message": "Data deleted successfully",
            "result": result,
            "error":"{}"
        }
        res.json(resdata)
   })
   .catch(err=>{
    const resdata = {
        "status": "ERROR",
        "message": "Something error",
        "result":"{}",
        "error": err
    }
    res.json(resdata)
   })
}


const allUnregister=(req,res,next)=>{
    Unregister.find()
    .then(result=>{
        const resdata = {
            "status": "OK",
            "message": "details of Unregister",
            "result":result!=0 ?result:"no data available",
            "error":"{}"
        }
        res.json(resdata)
    })
    .catch(err => {
        const resdata = {
            "status": "ERROR",
            "message": "Something went wrong",
            "result":"{}",
            "error": err
        }
        res.json(resdata)
       })
}


module.exports = {
    createUnregister,
    deletelUnregister,
    allUnregister
}