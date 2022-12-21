import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Данні які ми сховали від інших
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


async function start() {
   try {
      //для підголтовки к оновленню mongoose
      mongoose.set('strictQuery', false);

      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.r9005s1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,)

      app.listen(PORT, () => {
         console.log(`server started on port: ${PORT}`);
      });
   } catch(error) {
      console.log(error);
   }
}
start();