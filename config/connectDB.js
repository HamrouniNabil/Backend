const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

module.exports = connectDB = async()=>{
    try {
        await mongoose.connect(mongoURI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('DB is Connected')
    } catch (error) {
        console.log(error)
    }
}