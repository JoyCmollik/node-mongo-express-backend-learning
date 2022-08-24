const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

//  req => middleware => res
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// routes
app.use('/api/people', people);
app.use('/auth', auth);

app.post('/login', (req, res) => {
	const { name } = req.body;

	if (name) {
		res.status(201).send(`hello ${name}`);
	}

	res.status(401).send('please provide your credentials');
});

app.listen(5001, () => {
	console.log(`listening to the port: 5001`);
});
