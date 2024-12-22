const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./utill/Loggers");

dotenv.config();

mongoose.connect("mongodb+srv://ankitjain:ankit5678@cluster0.g69we.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
   serverSelectionTimeoutMS: 5000, 
   autoIndex: false,               
   maxPoolSize: 10,                
   socketTimeoutMS: 45000,         
   family: 4                       
})
.then(() => {
   console.log('MongoDB connected successfully');
})
.catch((err) => {
   logger.error(err)
});
