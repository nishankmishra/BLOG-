const express = require('express')
const app = express()
var routes = require('./routes/routes')
var mongoose = require('mongoose');


async function Connction(){
try{
   await mongoose.connect("mongodb://localhost:27017/est")
   console.log("connected to db");
}catch(e){
    console.log(e);
}

}

Connction()





app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
