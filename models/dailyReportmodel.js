// //import mongoose to create mongoose model
// const mongoose = require('mongoose');

// //create Schema
// const DailyReportSchema = new mongoose.Schema({
//     quran: {
//         type: Boolean,
//         required: true
//     },
//     hadith: {
//         type: Number,
//         required: true
//     },
//     studypage: {
//         type: Number,
//         required: true
//     },
//     prayer: {
//         type: Number,
//         min: 0,
//         max: 5,
//         required: true
//     },
//     dawattime: {
//         type: Number,
//         required: true
//     },
//     membermeet: {
//         type: Number,
//         required: true
//     },
//     bookdist: {
//         type: Number,
//         required: true
//     },
//     selfcriticism: {
//         type: Boolean,
//         required: true
//     },
//     remarks: {
//         type: String,
//         default: "No Comment"
//     },
//     reportDate: {
//         type: Date,
//         required: true
//     },
//     complete: {
//         type: Boolean,
//         default: true
//         // required: true
//     },
//     todaysReport: {
//         type: Boolean,
//         required: true
//     },
//     exercise: {
//         type: Boolean,
//         default: false
//         // required: true
//     },
//     familyTime: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 24
//         // required: true
//     },
//     socialWork: {
//         type: Boolean,
//         default: false
//     },
//     userId: {
//         type: String,
//         required: true
//     },
//     createDate: {
//         type: Date
//     },
//     updateDate: {
//         type: Date
//     },
//     archive: {
//         type: Boolean
//     }
// }, { collection: 'dailyreport' })

// //export this Schema

// module.exports = mongoose.model('dailyReportS', DailyReportSchema);