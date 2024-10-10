const News = require("../models/blogModel.js");

// Create a news article 
const createNews = async (req,res)=>{
    const chknews = await News.find({title : req.body.title})
    if(chknews.length === 0){
        try {
            const news = new News({
                title: req.body.title,
                description: req.body.description
            })
    
            const saveToDB = await news.save();
            return res.status(200).json(saveToDB); // Ensure only one response is sent
        }
catch (error) {
        return res.status(400).json({ message: error.message }); // Add return to ensure only one response
    }}else {
        return res.status(400).json({ message: "News already available" }); // Add return here to stop further execution
    }
}


//Get all the articles from the news 
const getAllNews = async (req,res)=>{
    try {
        const news = await News.find()
        res.status(200).json(news)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}


//Get a single news article

const getNews = async (req,res)=>{
    try {
        const news = await News.findOne({title: req.params.title})
        console.log(news)
        return res.status(200).json(news)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}

// Update a news article by ID
const updateNews = async (req, res) => {
    const { id } = req.params; // Get the news article ID from URL
    try {
        const updatedNews = await News.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is applied to the updated document
        });

        if (!updatedNews) {
            return res.status(404).json({ message: "News article not found" });
        }
        return res.status(200).json(updatedNews);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a news article by ID
const deleteNews = async (req, res) => {
    const { id } = req.params; // Get the news article ID from URL
    try {
        const deletedNews = await News.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ message: "News article not found" });
        }
        return res.status(200).json({ message: "News article deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



module.exports = {
    createNews,
    getAllNews,
    getNews,
    updateNews,
    deleteNews,
};