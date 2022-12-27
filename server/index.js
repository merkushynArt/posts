import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';


const app = express();
dotenv.config();

// Данні які ми сховали від інших
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware - для розширення функцыоналу express
// Для відправки запросів з різних ip-адресів
app.use(cors());
//Для того щобexpress розумів що дані с фронту будуть приходити у форматі json
app.use(express.json());
// Для загрузки файлів
app.use(fileUpload());
// Для того щоб express  розумів де будуть зберігатися статичні файли
app.use(express.static('uploads'));

// Routes
// http://localhost:3002/api/auth
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

async function start() {
   try {
      //для підголтовки к оновленню mongoose
      mongoose.set('strictQuery', false);
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.r9005s1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,)

      app.listen(PORT, () => {
         console.log(`server started on http://localhost:${PORT}/`);
      });
   } catch(error) {
      console.log(error);
   }
}
start();