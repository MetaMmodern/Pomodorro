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
    if (newPasswd.trim() !== "") {
      user.password = await bcrypt.hash(newPasswd, 12);
    }

    await user.save();

    return response.json({ message: "Account settings updated", status: 201 });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again later", code: error });
  }
});

async function deleteProgress(user) {
  user.tasks.forEach(async (taskId) => {
    const task = await Task.findById(taskId);
    task.tomatosFinished = 0;
    task.timeSpent = 0;
    await task.save();
  });
  await user.save();
  return { message: "All progress cleared", status: 200 };
}
async function deleteTasks(user) {
  user.tasks.forEach(async ({ _id }) => {
    const task = await Task.findByIdAndDelete(_id);
    await task.save();
  });
  user.tasks = [];
  await user.save();
  return { message: "All tasks deleted", status: 200 };
}
async function deleteAccount(user) {
  await deleteTasks(user);
  await user.deleteOne();
  return { message: "Acount deleted", status: 200 };
}

router.post("/delete/:whatToDelete", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId);
    const { submitPasswd } = request.body;
    const isMatch = await bcrypt.compare(submitPasswd, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .json({ message: "Incorrect password", status: 401 });
    }
    switch (request.params.whatToDelete) {
      case "progress":
        return response.status(200).json(await deleteProgress(user));
      case "tasks":
        return response.status(200).json(await deleteTasks(user));
      case "account":
        return response.status(200).json(await deleteAccount(user));
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});

module.exports = router;
