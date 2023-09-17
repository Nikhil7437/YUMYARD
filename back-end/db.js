const mongoose =require('mongoose')
let url ="mongodb+srv://namdevnikhil545:DtuzqwUGYEWhO6D5@cluster0.sdqhdwj.mongodb.net/yumyard"
mongoose.connect(url)

const db =mongoose.connection;


db.on("connected", ()=>
{
    console.log("connected to the database");
})
db.on("err", ()=>
{
    console.log("connection faild");
})

module.exports =mongoose