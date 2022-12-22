import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
   // Вітягуємо сам токен без того що спереду та пробілу завдяки replace(/Bearer\s?/, '');
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
   if(token) {
      try {
         // Розшифровую токен
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         req.userId = decoded.id;

         next();
      } catch {
         return res.json({ massage: 'Немає доступу.', });
      }
   } else {
      return res.json({ massage: 'Немає доступу.', });
   }
}