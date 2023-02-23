const Comment = require('../models/commentModel')
const Post = require('../models/postModel')


const createComment = (req, res, next) => {
    var post_id = req.body.post_id;
    const comment = new Comment({
        post_id: req.body.post_id,
        content: req.body.content,
        posted_by: req.body.posted_by,
        user_id: req.body.user_id,
        profile_pic: req.body.profile_pic,
        username: req.body.username,
    })
    comment.save()
        .then(user => {
            console.log(user)
        }).catch((err) => console.log(err))

    Post.findOneAndUpdate({ _id: post_id }, { $inc: { comments_count: 1 } })
        .then(user => {
            const resdata = {
                "status": "OK",
                "message": "you added comment",
                "result": "{}",
                "error": "{}"
            }
            res.json(resdata)
        })
        .catch((err) => {
            res.json(err)
        })

}

const replyComment = (req, res, next) => {
   var comment_id= req.body.comment_id;
    var reply=  {
        user_id: req.body.user_id,
        profile_pic: req.body.profile_pic,
        username: req.body.username,
        content :req.body.content
    }

    Comment.findOneAndUpdate({_id:comment_id},{$push:{replies:reply}})
    .then(value=>{
        // value.replies.push(reply)
        const resdata={
            "status": "OK",
            "message": "you added comment",
            "result": `${value}`,
            "error": {}
        }
        res.json(resdata)
    }).catch(err=>res.json(err))
}

const listComment=(req,res,next)=>{
Comment.findOne({post_id:req.body.post_id})
.then((result)=>{
    const resdata={
        "status": `${result!=null? "OK":'ERROR'}`,
        "message": `${result!=null? 'you added comment':'no comments available'}`,
        "result": result,
        "error": `${result!=null? " ":'EMPTY ERROR'}`,
    }
    res.json(resdata)
}).catch(err=>res.json(err))
}


module.exports = {
    createComment,
    replyComment,
    listComment
}