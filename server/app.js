// In server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const blogRoutes = require('./routes/blogroutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

async function Connect(){
    try{
        await mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.cbghp.mongodb.net/Blog-news")
        console.log("Connected to DB")
    }catch (e){
        console.log(e)
    }
}
Connect()

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
