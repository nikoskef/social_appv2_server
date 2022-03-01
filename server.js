const express = require('express');
//const serverless = require("serverless-http");
const logger = require('./middleware/logger');
const app = express();

require('./startup/cors')(app);
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/prod')(app);

//module.exports.run = serverless(app);

const port = process.env.PORT || 3001;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
