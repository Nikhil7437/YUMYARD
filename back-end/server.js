const express = require('express')
const app = express()
const db = require('./db')
const port = 8000;
const cors = require('cors');
const burgers = require('./models/burgermodel')
const burgersRoute = require('./routes/burgersRoute')
const userRouter = require('./routes/userRoute')
const checkout =require('./controller/paymentcontroller')
const Razorpay = require("razorpay");
const paymentsRoutes = require('./routes/paymentsRoutes')
const YOUR_KEY_ID = ' rzp_test_LRvbPCGsAIrqVx'
const YOUR_KEY_SECRET = 'gp9XkLR7KNecEsFt7olAMVx9'
app.use(cors());

app.use(express.urlencoded({ extended: true }))

const instance = new Razorpay({
  key_id: 'rzp_test_LRvbPCGsAIrqVx',
  key_secret: 'gp9XkLR7KNecEsFt7olAMVx9',
});

console.log(instance.orders);
app.use(express.json())
app.use('/api/burgers/', burgersRoute)
app.use('/api/user/', userRouter)
app.use('/api/order/', paymentsRoutes)





app.get('/', (req, res) => {

  res.send(" server is listning ")
})
app.get('/api/getkey', (req, res) => {

  res.status(200).json({key:"rzp_test_LRvbPCGsAIrqVx"})
})



// app.get('/getburger', (req, res) => {

//   burgers.find({})
//   .exec()
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).send({ error: 'An error occurred' });
//   });
// })

app.listen(port, function () {
  console.log(`server is listning on port localhost:${port}`);
})

module.exports = { instance }