const News = require('../models/blogModel');

// Public: Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await News.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Public: Get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await News.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Protected: Create a new blog (login required)
const createBlog = async (req, res) => {
    try {
        const blog = new News({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id  // Set the user ID as the author
        });

        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Protected: Update an existing blog (login required)
const updateBlog = async (req, res) => {
    try {
        const blog = await News.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Ensure the blog's author matches the logged-in user
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this blog' });
        }

        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Protected: Delete a blog (login required)
const deleteBlog = async (req, res) => {
    try {
        const blog = await News.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Ensure the blog's author matches the logged-in user
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this blog' });
        }

        await blog.remove();
        res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
