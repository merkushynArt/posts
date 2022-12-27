import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

// Create Post
export const createPost = async (req, res) => {
   try {
      const { title, text } = req.body;
      const user = await User.findById(req.userId);

      // Якщо в пості є картинка
      if(req.files) {
         let fileName = Date.now().toString() + req.files.image.name;
         // Отримую ту папку в якій знаходжуся(controllers)
         const __dirname = dirname(fileURLToPath(import.meta.url));
         // Переміщаю картинку в папку uploads
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

         const newPostWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId,
         });

         //Зберігаю пост з картинкою в базі данних  Posts
         await newPostWithImage.save();
         // Знайшов User і Пушу в posts User пост з картинкою
         await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithImage },
         });

         return res.json(newPostWithImage);
      }

      // Якщо в пості нема картинки
      const newPostWithoutImage = new Post({
         username: user.username,
         title,
         text,
         imgUrl: '',
         author: req.userId,
      });

      await newPostWithoutImage.save();
      // Знайшов User і пушу в post в User posts без картинки
      await User.findByIdAndUpdate(req.userId, {
         $push: { posts: newPostWithImage },
      });

      res.json(newPostWithoutImage);
   } catch (error) {
      res.json({ massage: 'Щось пішло не так.' });
   }
}