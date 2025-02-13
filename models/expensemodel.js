//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const ExpenseSchema = new mongoose.Schema({
    monthly_sheet_id: {
        type: String,
        required: true
    },
    expensePlan_id: {
        type: String,
        required: true
    },
    expense_date: {
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
}, { collection: 'expense' })

//export this Schema

module.exports = mongoose.model('expenses', ExpenseSchema);