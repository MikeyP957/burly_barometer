const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/api')
const route = require('./routes/index')
// const Workout = require('./models/workoutSchema')
const PORT = process.env.PORT || 4040

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//  localhost/workout
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(router);
app.use(route)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
