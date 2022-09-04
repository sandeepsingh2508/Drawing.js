const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");

mongoose
  .connect(DB, { useNewUrlParser: true, autoIndex: true })
  .then(() => console.log('Database connected successfully'));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Sandeep Here!");
})
app.use("/api/auth", authRouter);
app.get("*", (req, res)=>{
    res.send("NO route found!");
})

app.listen(PORT, ()=>{
    console.log(`Server running on: ${PORT}`)
})