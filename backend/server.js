require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/staty");

const app = express();

/*** MIDDLEWARES ***/

/*** ROUTES ***/
app.use(
  cors({
    origin: "*"
  })
);

app.use("/staty", routes);

/*** LISTEN ***/
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
