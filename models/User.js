const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
  settings: {
    workTime: { type: Number, default: 20 },
    restTime: { type: Number, default: 5 },
    tickSound: { type: String },
    finishSound: { type: String },
  },
});

module.exports = model("User", schema);
