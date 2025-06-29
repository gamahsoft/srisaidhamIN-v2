import express, { json, urlencoded } from "express";
// import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";

import servicesRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import webhook from "./routes/webhook.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//make sure you have the config before calling the variables from .env
dotenv.config();
const port = process.env.PORT || 8000;

//Connect to mongoDB
connectDB();

//initialize express
const app = express();
app.use(urlencoded({ extended: false }));

app.use(
  json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
//frontend request body parser middleware otherwise you will see null value in the request
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

// app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/event", eventRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/orders", cors(), orderRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
// app.use("/api/webhook", webhook);
app.use("/api/webhook", webhook);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
