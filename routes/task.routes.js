const { Router, request, response } = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (request, response) => {
  try {
    const tasks = await Task.find({ owner: request.user.userId });
    return response.json({ ...tasks });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});
router.post("/create", auth, async (request, response) => {
  try {
    const task = new Task({
      name: request.body.name,
      tomatosToFinish: request.body.tomatosToFinish || 0,
      workingTime: request.body.workingTime || 20,
      restTime: request.body.restTime || 5,
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

router.get("/delete/:id", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId);
    await Task.findByIdAndDelete(request.params.id);
    user.tasks = user.tasks.filter((el) => el.toString() !== request.params.id);
    await user.save();
    return response.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error, try again", code: error });
  }
});

router.post("/:id", async (request, response) => {
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
