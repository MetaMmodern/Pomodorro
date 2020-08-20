const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
  settings: {
    workTime: { type: Number },
    restTime: { type: Number },
    tickSound: { type: String },
    finishSound: { type: String },
  },
});

module.exports = model("User", schema);
