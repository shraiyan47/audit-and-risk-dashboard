//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const MonthlySheetSchema = new mongoose.Schema({
    month_name: {
        type: String,
        required: true
    },
    starting_balance: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { collection: 'monthlysheet' })

//export this Schema

module.exports = mongoose.model('monthlysheets', MonthlySheetSchema);