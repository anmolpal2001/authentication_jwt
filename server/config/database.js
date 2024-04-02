// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB Connected Successfully`);
    }
    catch (err)
    {
        console.log("Database connection failed");
        console.error(err);
        process.exit(1); 
    }
}

module.exports = connectDB;