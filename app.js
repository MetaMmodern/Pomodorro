const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 5000;
const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongouri'), {
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
