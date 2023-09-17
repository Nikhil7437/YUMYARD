const mongoose = require('mongoose')

const contactUser = mongoose.Schema({
    name: { type: String, require },
    email: { type: String, require },
    subject: { type: String, require },
    message: { type: String, require },
    isAdmin: { type: Boolean, require, default: false }

}, {
    timestamps: true
})

const contactUserModel = mongoose.model("contact", contactUser);

module.exports = contactUserModel