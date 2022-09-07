const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
	let testAccount = nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'daren20@ethereal.email',
			pass: 'TKhRekngKbn6xYX1vt',
		},
	});

	let info = await transporter.sendMail({
		from: "'Joy C Mollik' <joycmollik@gmail.com>",
		to: 'bar@example.com',
		subject: 'Hello',
		html: '<h2> Sending Emails with Node.js </h2>',
	});

	res.json({ info });
};

const sendEmail = async (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: 'test@gmail.com', // Change to your recipient
		from: 'test1@gmail.com', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}; 

	const info = await sgMail.send(msg);
	res.json(info);
};

module.exports = sendEmail;
