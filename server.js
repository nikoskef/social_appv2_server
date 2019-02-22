const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

app.get("/", (req, res, next) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
