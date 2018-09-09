const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const db = require('_helpers/db.js');
// const User = db.User;

const schema = new Schema({
    msg: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "User"
        },
        username: String
    },
    receiver: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "User"
        },
        username: String
    },
    status: {
        type: String,
        default: "Not SEEN"

    }


});



schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Complain', schema);