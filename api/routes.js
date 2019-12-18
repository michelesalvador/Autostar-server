'use strict'

const controller = require('./controller');

const expressJwt = require('express-jwt');
const fs = require('fs');
const publicKey = fs.readFileSync('./public.key');

module.exports = function (app) {

	// I path definiscono i servizi rest:

	// Non CRUD
	app.route('/hello').get(controller.getHello);
	app.route('/about').get(controller.about);
	app.route('/form').get(controller.form);

	// CRUD (che accedono al database)
	app.route('/vetrina/:num').get(controller.vetrinaAuto );
	app.route('/catalogo/:tipo').get( controller.elencoAuto);
	app.route('/auto/:id').get(controller.getAuto);
	app.route('/invia').post(expressJwt({secret:publicKey}), controller.postAuto)
		.put(expressJwt({secret:publicKey}), controller.updateAuto);
	app.route('/elimina/:id').delete(expressJwt({secret:publicKey}), controller.deleteAuto);
	app.route('/login').post(controller.login);
}