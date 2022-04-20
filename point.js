const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Point = new Schema({
    date: {
        type: String,
    },
    price: {
        type: Number,
    },
    mean: {
        type: Number,
    },
    stdDev: {
        type: Number,
    },
    buy: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Points', Point);