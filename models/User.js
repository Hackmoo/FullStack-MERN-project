import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
       type: String,
       required: true
    },
    avatarUrl:String // Необязательное к заполнению поле
}, {
  timestamps: true // К изменениям объекта автоматически ставит дату создания или изменения
})

export default mongoose.model("User" , UserSchema)