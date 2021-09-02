const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendEmail = async (options) => {
	const msg = {
		to: options.mail,
		from: `${process.env.PROJECT_NAME} <${process.env.SEND_GRID_SENDER_MAIL}>`,
		subject: options.subject,
		html: options.mainBody,
	};
	const res = await sgMail.send(msg);
	if (res[0].statusCode !== 202) {
		throw new ErrorResponse('Please try again. There was an error while sending the email');
	}
};

module.exports = sendEmail;
