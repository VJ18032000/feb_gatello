const Like = require('../models/likeModel')
const Post=require('../models/postModel')

const like = (req, res, next) => {
    var post_id=req.body.post_id;
    const like = new Like({
        user_id: req.body.user_id,
        username: req.body.username,
        profile_url: req.body.profile_url,
        post_id: req.body.post_id
    })
    Post.findOneAndUpdate({_id:post_id},{$inc:{likes_count:1}})
        .then(user => {
            like.save()
            const resdata = {
                "status": "OK",
                "message": "like successfully",
                "result": `${like}`
            }
            res.json(resdata)
        })
        .catch((err) => {
            res.json(err)
        })
}

const unLike = (req, res, next) => {
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
   Like.deleteOne({ $and: [{ post_id: post_id }, { user_id: user_id }] }) 
        .then((result) => {
            const resdata = {
                "status": "OK",
                "message": "unlike successfully",
                "result": `${result}`
            }
            res.json(resdata)
        })
   Post.findOneAndUpdate({_id:post_id},{$inc:{likes_count:-1}})  
   .then((result) => {
    console.log(result)
})
    

}

const likedUser = (req, res, next) => {
    var id = req.body.post_id

    Like.find({ post_id: id })
        .then((result) => {
                const resdata = {
                    "status": "OK",
                    "message": `${result!=0?'list of all liked users':'no likes available'}`,
                     result
                }
                res.json(resdata)
        }).catch((err)=>console.log(err))
}

module.exports = {
    like,
    unLike,
    likedUser
}