const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
	const { name } = req.body;

	if (name) {
		res.status(201).send(`hello ${name}`);
	}

	res.status(401).send('please provide your credentials');
});

module.exports = router;