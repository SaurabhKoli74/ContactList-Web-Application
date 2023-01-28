//require mongoose to create schema
const mongoose = require('mongoose');

// creating Schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//Creating Collection which contain the above Schema
const Contact = mongoose.model('Contact',contactSchema);
//created collection called Contact using contactSchema as schema

module.exports = Contact; //exported to use it in index.js(Server)
