const express = require('express')
const app = express()
var routes = require('./routes/routes')
var mongoose = require('mongoose');

app.use(express.urlencoded({extended: true}))
app.use(express.json())


async function Connction(){
try{
    await mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.cbghp.mongodb.net/Blog-news");
   console.log("connected to db");
}catch(e){
    console.log(e);
}

}

Connction()

app.use("/api/news", routes)




app.get("/",(req,res)=>{
    res.send("hi")
})





app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
