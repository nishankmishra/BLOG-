const express = require ("express");

const router = express.Router();
var newsController = require('../controllers/newsController');

// Create a news article
router.post('/', newsController.createNews);

// Get all news articles
router.get('/', newsController.getAllNews);

// Get a specific news article by title
router.get('/:title', newsController.getNews); // Dynamic route for getting a news article by title

// Update a specific news article by ID
router.put('/:id', newsController.updateNews); // Update news article by ID

// Delete a specific news article by ID
router.delete('/:id', newsController.deleteNews); // Delete news article by ID


module.exports = router