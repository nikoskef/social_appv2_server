const mongoose = require("mongoose");
const logger = require("../middleware/logger");

module.exports = function() {
  const db = process.env.MONGO_URI; // require("../config/keys").mongoURI;
  mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })

    .then(() => logger.info(`Connected to MongoDB`));
};
