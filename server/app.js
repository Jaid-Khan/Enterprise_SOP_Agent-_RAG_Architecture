const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

const document = []

app.post("/ask", (req, res) => {
  res.json({
    success: true,
    message: "login successfull",
    user:req.body
  }
);
console.log(req.body)

});

module.exports = app;
