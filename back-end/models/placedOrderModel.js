const  mongoose = require('mongoose')

const order = mongoose.Schema({
    razorpay_order_id: {type:String ,require},
    razorpay_payment_id:{type:String ,require},
    cartItems:{ type : Array, require },
    subtotal:{type:String ,require}
    
},{
    timestamps:true
})

const orderModel =mongoose.model("userorders",order);

module.exports = orderModel