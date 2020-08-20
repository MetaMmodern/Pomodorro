const { Router, request, response } = require("express");
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const User = require("../models/User");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post("/update/work", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId);
    const newSettings = {
      ...request.body,
    };
    user.settings = newSettings;
    await user.save();
    return response.json({ message: "Work settings updated", status: 201 });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again later", code: error });
  }
});
router.post("/update/account", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId);
    const { newUsername, newPasswd, submitPasswd } = request.body;
    const isMatch = await bcrypt.compare(submitPasswd, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .json({ message: "Incorrect password", status: 401 });
    }
    user.username = newUsername;
    user.password = await bcrypt.hash(newPasswd, 12);
    await user.save();

    return response.json({ message: "Account settings updated", status: 201 });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again later", code: error });
  }
});
router.get("/delete/progress", auth, async (request, response) => {
  try {
    const task = new Task({
      name: request.body.name,
      tomatosToFinish: request.body.tomatosToFinish || 0,
      workingTime: request.body.workingTime || 0,
      restTime: request.body.restTime || 0,
      owner: request.user.userId,
    });
    await task.save();
    const user = await User.findById(request.user.userId);
    user.tasks.unshift(task);
    await user.save();
    response.json({ message: "Made new toDo", status: 201 });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});

router.get("/delete/tasks", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId);
    user.tasks.forEach((tasks) => {
      // TODO
      console.log(task);
    });
    return response.status(200).json({ message: "Tasks deleted" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});

router.post("/delete/account", async (request, response) => {
  try {
    const task = await Task.findById(request.params.id);
    return response.json({ ...task, owner: null });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});

module.exports = router;
