// Import express
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// Connect to database
const connectDB = require('./config/database');
connectDB();    
const app = express();
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/dist')));

app.get("*",(req,res) => {
    res.sendFile(path.join(_dirname, 'client','dist','index.html'));
});

app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 4000;


// import routes and mount them
const user = require('./routes/user');
app.use('/api/v1',user);

// Start server
app.listen(PORT, (req,res) => {
    console.log(`Server started on port ${PORT}`);
})
