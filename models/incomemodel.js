//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const IncomeSchema = new mongoose.Schema({
    monthly_sheet_id: {
        type: String,
        required: true
    },
    incomePlan_id: {
        type: String,
        required: true
    },
    income_date: {
        type: Date,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { collection: 'income' })

//export this Schema

module.exports = mongoose.model('incomes', IncomeSchema);