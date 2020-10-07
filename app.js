const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const PORT = config.get("port") || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/settings", require("./routes/settings.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongouri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`app has been started on ${PORT}`);
    });
  } catch (error) {
    console.log(`server error: ${error.message}`);
    process.exit(1);
  }
}

start();
