import mongoose from "mongoose";
/*
const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      posts: [{
         //Посилання на іншу схeму
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'Post',
      }],
   },
   //Дата створення посту
   { timestamps: true },
);
*/
const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      aboutblog: {
         type: String,
         default: 'Some text',
      },
      posts: [{
         //Посилання на іншу схeму
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'Post',
      }],
   },
   //Дата створення посту
   { timestamps: true },
);



export default mongoose.model('User', UserSchema);