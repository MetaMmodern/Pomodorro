const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  tomatosToFinish: { type: Number, default: 0 },
  tomatosFinished: { type: Number, default: 0 },
  workingTime: { type: Number, default: 20 },
  restTime: { type: Number, default: 5 },
  timeSpent: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  owner: [{ type: Types.ObjectId, ref: "User" }],
});

module.exports = model("Task", schema);
