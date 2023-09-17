const  mongoose = require('mongoose')

const burgersSchema = mongoose.Schema({
    name: {type:String ,require},
    varient:[],
    price:[],
    category:{ type : String, require },
    image:{ type : String, require},
    description:{ type : String, require }
},{
    timestamps:true
})

const burgersModel =mongoose.model("burgers",burgersSchema);

module.exports = burgersModel