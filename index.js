const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const path = require('path');

// Load Env Vars
if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv');
	dotenv.config({ path: './config/config.env' });
}

// Import routes files

// Initialize App
const app = express();

// Logging Middleware
app.use(morgan('dev'));

// Enable Cors
app.use(cors());

// Cookie Parser Middleware
app.use(cookieParser());

// Body Parser Setup
app.use(express.json());

// Use Routes in app
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/blogs', require('./routes/blog'));

// Error Handler Middleware
app.use(errorHandler);

// Serve "Public" folder as a static directory
app.use(express.static(__dirname + '/public'));

// Frontend
if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public', 'webpage', 'index.html'));
	});
}

// PORT Setup and Server Setup on PORT
const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, async () => {
	console.log(
		chalk.yellowBright.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
	);
	await connectDB();
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
	console.log(chalk.bold.redBright(`Error: ${err.message}`));

	console.log(err);

	server.close(() => {
		console.log(chalk.bold.redBright('Server closed due to unhandled promise rejection'));
		process.exit(1);
	});
});
