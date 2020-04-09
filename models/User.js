const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name:String,
        email:String,
        password:String,
        phone:String

})

module.exports = User = mongoose.model('user',userSchema)