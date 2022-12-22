import User from '../models/User.js';
import bcrypt  from 'bcryptjs';

// Register user
export const register = async (req, res) => {
   try {
      // Получаємо данні з фронту
      const { username, password } = req.body;

      const isUsed = await User.findOne({ username });
      if(isUsed) {
         return res.json({ message: 'Цей username вже зайнятий.' });
      }

      //Складність хешування
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
         username,
         password: hash,
      });

      await newUser.save();

      res.json({
         newUser,
         message: 'Реєстрація пройшла успішно.',
      })
   } catch(error) {
      res.json({ message: 'Помилка при створенні користувача.',});
   }
}
// Login user
export const login = async (req, res) => {
   try {

   } catch(error) {
      console.log(error);
   }
}

//Get me
export const getMe = async (req, res) => {
   try {

   } catch(error) {
      console.log(error);
   }
}