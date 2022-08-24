const express = require('express');
const router = express.Router();

const {
	getPeople,
	createPerson,
	updatePerson,
	deletePerson,
} = require('../controllers/people');

// router.get('/', getPeople);

// router.post('/postman', createPerson);

// router.put('/:id', updatePerson);

// router.delete('/:id', deletePerson);

// another way to do
router.route('/').get(getPeople);
router.route('/postman').post(createPerson);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
