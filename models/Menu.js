const mongoose = require("mongoose") ;

const MenuSchema = new mongoose.Schema({
    name: {type: String , required: true},
    description: {type: String, required: true},
    precio: {type: Number , required: true},
});

module.exports = mongoose.model('Menu' , MenuSchema);