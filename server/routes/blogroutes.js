const express = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes
const router = express.Router();

// Public routes (no login required)
router.get('/', getAllBlogs); // View all blogs
router.get('/:id', getBlogById); // View a single blog by ID

// Protected routes (login required)
router.post('/', protect, createBlog); // Create a new blog
router.put('/:id', protect, updateBlog); // Update an existing blog
router.delete('/:id', protect, deleteBlog); // Delete a blog

module.exports = router;
