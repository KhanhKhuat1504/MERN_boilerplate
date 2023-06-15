const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const user = mongoose.model('User', User);
module.exports = user;