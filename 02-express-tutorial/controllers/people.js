const { people } = require('../data');

const getPeople = (req, res) => {
	res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
	const { name } = req.body;

	if (!name) {
		res.status(400).json({
			success: false,
			msg: 'please provide name value',
		});
	}
	res.status(201).json({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	const person = people.find((person) => person.id === Number(id));

	if (!person) {
		res.status(400).json({
			success: false,
			msg: `no person found with id ${id}`,
		});
	}
	const newPeople = people.map((person) => {
		if (person.id === Number(id)) {
			person.name = name;
		}

		return person;
	});
	res.status(201).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
	const { id } = req.params;

	const person = people.find((person) => person.id === Number(id));

	if (!person) {
		res.status(400).json({
			success: false,
			msg: `no person found with id ${id}`,
		});
	}
	const newPeople = people.filter((person) => person.id !== Number(id));
	res.status(201).json({ success: true, data: newPeople });
};

module.exports = {
	getPeople,
	createPerson,
	updatePerson,
	deletePerson,
};
