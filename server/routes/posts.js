import { Router } from "express";
import { createPost, getAll, getById } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create Post http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);

// Get all posts http://localhost:3002/api/posts
router.get('/', getAll);

// Get post by id http://localhost:3002/api/posts:id
router.get('/:id', getById);

export default router;