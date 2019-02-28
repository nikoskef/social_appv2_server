const express = require("express");
const logger = require("./middleware/logger");
const serverless = require("serverless-http");
const app = express();

require("./startup/cors")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 5000;

//app.listen(port, () => logger.info(`Server running on port ${port}`));
module.exports.handler = serverless(app);
