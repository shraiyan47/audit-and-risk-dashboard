//import mongoose to create mongoose model
const mongoose = require("mongoose");

//create Schema
const RisksSchema = new mongoose.Schema(
  {
    issue_id: {
      type: String,
      required: true,
    },
    risk_code: {
      type: String,
      // required: true,
    },
    risk_type: {
      type: String,
      // required: true,
    },
    probability: {
      type: String,
      // required: true,
    },
    impact: {
      type: String,
      // required: true,
    },
    risk_owner: {
      type: String,
      // required: true,
    },
    risk_status: {
      type: String,
      // required: true,
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
  { collection: "risk" }
);

//export this Schema

module.exports = mongoose.model("risks", RisksSchema);
