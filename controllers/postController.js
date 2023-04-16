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

export const getAll = async (req,res) => {
    try{
      const posts = await PostModel.find().populate('user').exec()

      res.json(posts)
    } catch(err){
      res.status(500).json({
         message: 'couldn\'t get posts'
      })
    }
}
export const getOne = async (req,res) => {
   try{
     const postId = req.params.id

     PostModel.findOneAndUpdate(
      {
      _id:postId,
     }, 
     {
      $inc: { viewsCount: 1} // $inc - increment
     }, 
     {
      returnDocument: 'after'
     }).then((doc,err) => {
      if(err){
         console.log(err)
        return  res.status(500).json({
            message: 'couldn\'t get posts'
         })
      }

      if(!doc) {
         return res.status(404).json({
            message: 'Post is not exist'
         })
      }

      res.json(doc)})
     
   } catch(err){
      console.log(err)
     res.status(500).json({
        message: 'couldn\'t get posts'
     })
   }
}

export const remove = async (req,res) => {
   try{
     const postId = req.params.id

     PostModel.findOneAndDelete({
      _id: postId
     },).then((doc, err) => {
      if(err) {
         return res.status(500).json({
            message: 'couldn\'t delete post'
         })
      }

      if(!doc){
         return res.status(404).json({
            message: 'coudld\'t find post'
         })
      }

      res.json({
         seccess: true
      })
     })
     
   } catch(err){
      console.log(err)
     res.status(500).json({
        message: 'couldn\'t get posts'
     })
   }
}