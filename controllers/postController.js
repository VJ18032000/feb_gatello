const Post=require('../models/postModel')

const createPost=(req,res,next)=>{
    const post = new Post({
        user_id:req.query.user_id,
        username:req.query.username,
        profile_url:req.query.profile_url,
        description:req.query.description
    })
    if (req.file) {
        post.posts = req.file.path
    }
    console.log(post)
    post.save()
    .then(user => {
        const resdata = {
            "status": "OK",
            "message": "create post successfully",
            "data":`${user}`
        }
        res.json(resdata)
    })
    .catch(err => {
    console.log(post)
        res.json({err})
    })
}

const deletePost=(req,res,next)=>{
        var user_id=req.body.user_id
        var id=req.body.post_id
        var posts=req.body.posts_url
    Post.findOneAndRemove({$and :[{_id:id},{user_id:user_id},{posts:posts}]})
    .then(post=>{
         post.remove()
        res.send({message:"post deleted successfull"})
    })
    .catch(err=>{
        res.send(err)
    })

}

const editPost=(req,res,next)=>{
    var user_id=req.body.user_id
    var id=req.body.post_id

    Post.findOne({$and :[{_id:id},{user_id:user_id}]})
    .then(post=>{
        post.description=req.body.description
        post.save()
       res.send(post)
   })
   .catch(err=>{
       res.send(err)
   })
}

const details=(req,res,next)=>{
    var id=req.query.post_id

    Post.findById({_id:id})
    .then(post=>{
        const resdata={
            "status": "OK",
            "message": "post details",
            "result": {post},
            "error": {}
        }
        res.json(resdata)
    })
}

const listMyfeed=(req,res,next)=>{
Post.find({user_id:req.body.user_id})
.then(value=>{
    const resdata={
        "status": "OK",
        "message": "list of my feeds",
        "result": value,
        "error": {}
    }
    res.json(resdata)
})
}

module.exports={
    createPost,
    deletePost,
    editPost,
    details,
    listMyfeed
}