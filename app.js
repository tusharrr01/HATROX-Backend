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
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// CORS: allow React dev server to send/receive cookies
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: corsOrigin,
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
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Route not found"
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.API_HOST || "localhost";

app.listen(PORT, () => {
  console.log(`✓ API running on http://${HOST}:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});
