const mongoose = require ('mongoose')
mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;

connection.on('connected',()=>{console.log('mongodb is connceted')})
connection.on('error', (error)=>{console.log('error in mongodb connection',error)})

module.exports = mongoose;