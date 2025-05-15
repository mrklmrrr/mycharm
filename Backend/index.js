require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./Routes/AuthRoutes")
const followersRouter = require("./Routes/followersRoutes")
const inventoryRouter = require("./Routes/InventoryRoutes")
const postRoutes = require("./Routes/PostRoutes")

const app = express();

// Проверка MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error("Ошибка: MONGODB_URI не определена в .env");
  process.exit(1);
}

// middleware
app.use(express.json());
app.use(cors({}));

app.use("auth", authRouter)
app.use("follow", followersRouter)
app.use("inventory", inventoryRouter)
app.use("post", postRoutes)

// Простой маршрут для проверки
app.get("/", (req, res) => {
  res.send("Сервер работает");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Ошибка подключения к MongoDB:", error);
  });

module.exports = app
