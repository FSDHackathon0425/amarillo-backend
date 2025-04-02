const mongoose = require("mongoose") ;

const OrdersSchema = new mongoose.Schema({
    user: {type: String},
    order: [{
        menuID: {type: mongoose.Schema.Types.ObjectId, ref: "Menu" , requires: true},
        nameDish: {type: String , required: true},
        quantita: {type: Number} , required: true,}
    ],
    state: {type: Boolean},
    date: {type: Date , default: Date.now() }
});

module.exports = mongoose.model('Orders' , OrdersSchema);