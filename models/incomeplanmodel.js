//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const IncomePlanSchema = new mongoose.Schema({
    monthly_sheet_id: {
        type: String,
        required: true
    },
    plan_id: {
        type: String,
        required: true
    },
    plan_amount: {
        type: Number,
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
    
}, { collection: 'incomeplan' })

//export this Schema

module.exports = mongoose.model('incomeplans', IncomePlanSchema);