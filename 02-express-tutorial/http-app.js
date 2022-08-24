const http = require('http');
const { readFileSync } = require('fs');

const server = http.createServer((req, res) => {
	const url = req.url;

	// get all files
	const homePage = readFileSync('./navbar-app/index.html');
	const homeCss = readFileSync('./navbar-app/styles.css');
	const homeLogo = readFileSync('./navbar-app/logo.svg');
	const homeJs = readFileSync('./navbar-app/browser-app.js'); 

    console.log(url)

	if (url === '/') {
		res.writeHead(200, { 'content-type': 'text/html' });
		res.write(homePage);
		res.end();
	} 
    // styles
	else if (url === '/styles.css') {
		res.writeHead(200, { 'content-type': 'text/css' });
		res.write(homeCss);
		res.end();
	} 
    // /image/logo
	else if (url === '/logo.svg') {
		res.writeHead(200, { 'content-type': 'image/svg+xml' });
		res.write(homeLogo);
		res.end();
	}
    // logic 
	else if (url === '/browser-app.js') {
		res.writeHead(200, { 'content-type': 'text/javascript' });
		res.write(homeJs);
		res.end();
	} else {
		res.writeHead(404, { 'content-type': 'text/html' });
		res.end('<h4>page is not found!</h4>');
	}
});

server.listen(5050);
