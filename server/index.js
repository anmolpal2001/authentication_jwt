
// Import express
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

// Connect to database
const connectDB = require('./config/database');
connectDB();    

// import routes and mount them
const user = require('./routes/user');
app.use('/api/v1',user);

// Start server
app.listen(PORT, (req,res) => {
    console.log(`Server started on port ${PORT}`);
})