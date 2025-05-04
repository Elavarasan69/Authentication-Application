const mongoose = require('mongoose')

const UserData = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateCrteated:{
        type:Date,
        default: ()=>Date.now(),
        immutable: true
    }
})

module.exports = mongoose.model("User",UserData)



