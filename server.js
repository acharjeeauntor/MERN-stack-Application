const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//Db Config
const db = require("./config/Keys").mongoURI;

//DB Connection
mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//Routes
app.use("/users", require("./routes/Users"));
app.use("/budget/income", require("./routes/budget/Income"));
app.use("/budget/exp", require("./routes/budget/Exp"));
app.use("/statement", require("./routes/Statement"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server run on port ${port}`));
