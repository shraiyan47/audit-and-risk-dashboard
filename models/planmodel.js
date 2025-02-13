//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const PlanSchema = new mongoose.Schema({
    plan_name: {
        type: String,
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
}, { collection: 'plancat' })

//export this Schema

module.exports = mongoose.model('plans', PlanSchema);