const express = require('express');
require('dotenv').config()
const app = express();
const dbConfig = require('./config/dbConfig')
app.use(express.json()) 
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const port = process.env.PORT || 5000;

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.listen(port, ()=>console.log (`nodemon server starting at ${port}`));