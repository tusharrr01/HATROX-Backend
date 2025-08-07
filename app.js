const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownersRouter =  require("./routes/ownersRouter");
const productsRouter =  require("./routes/productsRouter");
const authRouter =  require("./routes/authRouter");
const shopRouter = require("./routes/shopRouter")
const index = require("./routes/index")

require("dotenv").config();

const db =  require('./config/mongoose-connection');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/" , index);
app.use("/owners" ,ownersRouter);
app.use("/auth" ,authRouter);
app.use("/shop" ,shopRouter);
app.use("/products" ,productsRouter); 

app.listen(3000);