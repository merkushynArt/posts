import Description from '../models/Description.js';

export const createDescription = async (req, res) => {
   try {
      const { description } = req.body;
      const newDescription = new Description({
         description,
      });
      await newDescription.save();
      
      res.json({
         description,
         message: 'Опис вашої сторінки пройшов успішно.',
      });
   } catch(error) {
      res.json({ message: 'Помилка при описанні вашої сторінки.',});
   }
}