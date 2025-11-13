import express, { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import connectDB from "./config/db.js";
// import dotenv from "dotenv";
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
// dotenv.config();
if (process.env.NODE_ENV !== "production") {
  // Load .env only in local dev
  const { default: dotenv } = await import("dotenv");
  dotenv.config();
}
const port = process.env.PORT || 8000;

//Connect to mongoDB
connectDB();

//initialize express
const app = express();
app.use(urlencoded({ extended: false }));

// Apply to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);

//authentication routes
// const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
//   max: 5,
//   message: 'Too many login attempts. Try again in 5 minutes.',
// });
// app.post('/login', loginLimiter, handleLogin);

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

//Get around cors issue
const allowedOrigins = [
  process.env.FRONTEND_URL, // Your deployed production frontend URL
  process.env.LOCAL_URL, // Your React development server
];

// CORS must be registered BEFORE any routes
app.use((req, res, next) => {
  // Helps caches vary by Origin so proxies/CDNs don't mix responses
  res.header("Vary", "Origin");
  next();
});

app.use(
  cors({
    origin(origin, cb) {
      // Allow non-browser tools (no origin) and your whitelisted sites
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true, // set to true only if you actually use cookies/auth headers cross-site
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Handle preflight quickly
app.options("*", cors());

//below code used to bundle frontend and backend in the same deployment to render
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "development") {
//static folder
// app.use(express.static(path.join(__dirname, "/frontend/build")));

//any route that is not api will be redirected to index.html
// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   })
// } else {
// }

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
