//import mongoose to create mongoose model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema
const MitigationsSchema = new mongoose.Schema(
  {
    risk_id: {
      type: String,
      required: true,
    },
    actions: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    resources: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
  { collection: "mitigation" }
);

//export this Schema

module.exports = mongoose.model("mitigations", MitigationsSchema);
