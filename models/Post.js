import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
       type: Array,
       default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageUrl:String // Необязательное к заполнению поле
}, {
  timestamps: true // К изменениям объекта автоматически ставит дату создания или изменения
})

export default mongoose.model("Post" , postSchema)