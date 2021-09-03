const admin = require('firebase-admin');
const serviceAccount = require('./secret.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'gs://work-binder-2021.appspot.com',
});

module.exports = admin;
