// const { instance } =require ("../server");
const Razorpay = require("razorpay");

const YOUR_KEY_ID = ' rzp_test_LRvbPCGsAIrqVx'
const YOUR_KEY_SECRET = 'gp9XkLR7KNecEsFt7olAMVx9'

const crypto = require("crypto");
const orderModel = require("../models/placedOrderModel")

function hmac_sha256(data, key) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(data);
  return hmac.digest("hex");
}
const instance = new Razorpay({
  key_id: 'rzp_test_LRvbPCGsAIrqVx',
  key_secret: 'gp9XkLR7KNecEsFt7olAMVx9',
});
const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.subtotal * 100), 

    currency: "INR"

  };
  console.log("subtotal amount is ", req.body.subtotal);

  try {

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({ success: true, order  });

  } catch (error) {
    console.error("Error occurred during checkout:", error);
    res.status(500).json({ success: false, error: "An error occurred during checkout" });
  }


}
const paymentVerification = async (req, res) => {
  console.log("this is the payment verification reqbody ", req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, cartItems, subtotal } = req.body;
  console.log("this is the req.body elements",req.body);
  try {
    generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, YOUR_KEY_SECRET);
    console.log("this is  a generated signateure");
    if (generated_signature == razorpay_signature) {
      const newOrder = new orderModel({
        razorpay_payment_id, razorpay_order_id, cartItems, subtotal
      })
      try {
        await newOrder.save()
        console.log("order stored successfully ");

      } catch (error) {
        return res.status(400).json({ message: error })
      }





      res.redirect('http://localhost:3000')

      console.log("key matchedddddddddd");
    }
    else {
      res.status(400).json({
        success: false
      })
    }


    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error occurred during paymentVerification:", error);
    res.status(500).json({ success: false, error: "An error occurred during paymentVerification" });
  }


}
module.exports = { checkout, paymentVerification }