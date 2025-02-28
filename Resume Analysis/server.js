import express from "express";
import connectDB from "./config/db.js";
import router from "./Route/resume.route.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`The app is Listening on ${PORT}`);
});
