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

//Get all posts
export const getAll = async (req, res) => {
   try {
      // Получаю усі пости та сортую їх по даті створенню
      const posts = await Post.find().sort('-createdAt');
      // Получаю 5 найпопулярніших постів, сортую їч по перегдядам
      const popularPosts = await Post.find().limit(5).sort('-views');

      if(!posts) {
         return res.json({ message: 'Постів немає.' });
      }

      res.json({ posts, popularPosts });
   } catch(error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

//Get post by id
export const getById = async (req, res) => {
   try {
      // Получив пост та оновив перегляди
      const post = await Post.findByIdAndUpdate(req.params.id, {
         $inc: { views: 1 },
      });

      res.json(post);
   } catch(error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

// Get All Posts
export const getMyPosts = async (req, res) => {
   try {
      const user = await User.findById(req.userId);
      const list = await Promise.all(
         user.posts.map((post) => {
            return Post.findById(post._id);
         })
      );

      res.json(list);
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}