const mongoose = require("mongoose");
module.exports = function() {
  const db = require("../config/keys").mongoURI;
  mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })

    .then(() => console.log(`Connected to MongoDB`));
};
