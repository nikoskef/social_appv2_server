const mongoose = require('mongoose');
const logger = require('../middleware/logger');

const url = process.env.DB_URL;

mongoose.connection.once('open', () => logger.info(`Connected to MongoDB`));
mongoose.connection.on('error', (err) => {
	console.log('MONGO ERROR');
	console.error(err);
});

module.exports = function () {
	mongoose.connect(url, { useUnifiedTopology: true });
};
