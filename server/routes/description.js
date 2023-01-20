import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createDescription } from '../controllers/description.js';

const router = new Router();

// Create description
// http://localhost:3002/api/description
router.post('/', checkAuth, createDescription);

export default router;