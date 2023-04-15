import PostModel from '../models/Post.js'

export const create = async (req,res) => {
   try {
     const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageURL: req.body.imageURL,
        tags: req.body.tags,
        user: req.userId
     }) 

     const Post = await doc.save()

     res.json(Post)
   } catch(err){
     res.status(500).json({
        message: 'failed to create post'
     })
   }
}

export const getAll = (req,res) => {
    res.json({
        message:'temp'
    })
}