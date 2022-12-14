const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://zerokodes:Success1998@nodeexpressprojects.ns89stl.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority"
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, console.log(`Server is listen on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
