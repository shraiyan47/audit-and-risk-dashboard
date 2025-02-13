// //import mongoose to create mongoose model
// const mongoose = require('mongoose');

// //create Schema
// const NoteSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     details: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         default: ""
//     },
//     privacy: {
//         type: String,
//         default: "private"
//     },
//     todo_tags: {
//         type: Array
//     },
//     date: {
//         type: String,
//     },
//     userId: {
//         type: String,
//         required: true
//     },
// }, { collection: 'notes' })

// //export this Schema

// module.exports = mongoose.model('note', NoteSchema);