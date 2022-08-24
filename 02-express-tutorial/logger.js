const logger = (req, res, next) => {
	const method = req.method;
	const url = req.url;
	const date = new Date().getFullYear();
	console.log(date, method, url);

	next();
};

module.exports = logger;
