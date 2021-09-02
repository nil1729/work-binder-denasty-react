const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoIndex: true, //make this also true
		});

		console.log(
			chalk.blueBright.underline(
				`Database Connected (${conn.connection.name}): ${conn.connection.host}`
			)
		);
	} catch (err) {
		console.log(chalk.bold.redBright(`Error: ${err.message}`));
		throw new Error('Database not Connected');
	}
};
