// server/app.js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

require("dotenv").config();
require("./config/mongoose-connection");

// Routers
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const authRouter = require("./routes/authRouter");
const shopRouter = require("./routes/shopRouter");
const index = require("./routes/index");

// CORS: allow React dev server to send/receive cookies
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev URL
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// If still using sessions/flash anywhere (safe to remove later when fully API-only)
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

// Static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// If still rendering EJS for legacy pages; remove once fully on React
app.set("view engine", "ejs");

// Mount routes
app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/products", productsRouter);

app.listen(3000, () => console.log("API running on http://localhost:3000"));
