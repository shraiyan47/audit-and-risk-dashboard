//import mongoose to create mongoose model
const mongoose = require("mongoose");

//create Schema
const IssuesSchema = new mongoose.Schema(
  {
    issue_title: {
      type: String,
      // required: true,
    },
    issue_description: {
      type: String,
      // required: true,
    },
    issue_source: {
      type: String,
      // required: true,
    },
    issue_category: {
      type: String,
      // required: true,
    },
    issue_priority: {
      type: String,
      // required: true,
    },
    issue_status: {
      type: String,
      // required: true,
    },
    issue_attachments: {
      data: Buffer, // Store image data as binary
      contentType: String, // Store the MIME type of the image
    },
    date: {
      type: Date,
      // required: true,
    },
    complete: {
      type: Boolean,
      // required: true,
    },
    userId: {
      type: String,
      // required: true,
    },
  },
  { collection: "issue" }
);

//export this Schema

module.exports = mongoose.model("issues", IssuesSchema);
