const express =require('express')
const router = express.Router()
const Burger =require('../models/burgermodel')



router.get('/getallburgers', async(req,res)=>
{
    try {
        const burgers = await Burger.find({})
        res.send(burgers)
    } catch (error) {
        return res.status(400).json({message:error})
    }
})

module.exports = router;