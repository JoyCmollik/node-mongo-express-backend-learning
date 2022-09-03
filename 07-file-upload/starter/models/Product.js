const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
     name: {
        type: String, 
        minlength: 10, 
        maxlength: 25, 
        required: true
     }, 
     price : {
        type: Number, 
        required: true
     },
    image : {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema);