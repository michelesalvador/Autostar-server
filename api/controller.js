'use strict'

let properties = require('../package.json');
let autos = require('../service/dbauto');
let autor = require('../service/login');

let controllers = {
	getHello: function (req, res) {
		res.send("<h1>Ciao Mondo!</h1>:-)");
	},
	about: function (req, res) {
		let aboutInfo = {
			name: properties.name,
			version: properties.version
		};
		res.json(aboutInfo);
	},
	form: function(req,res) {
		res.sendFile( 'C:/Users/Michele/Documents/Retica/esercizi/webserver/form.html' );
	},
	vetrinaAuto: function( req, res ) {
		autos.findSome(req, res);
	},
	elencoAuto: function( req, res ) {
		autos.findAll(req, res, function (err, coms) {
			if (err)
				res.send(err);
			res.json(coms);
		});
	},
	getAuto: function (req, res) {
		autos.findOne(req, res, function (err, coms) {
			if (err)
				res.send(err);
			res.json(coms);
		});
	},
	postAuto: function (req,res) {
		autos.post(req, res);
	},
	updateAuto: function (req,res) {
		autos.update(req, res);
	},
	deleteAuto: function (req,res) {
		autos.delete(req, res);
	},
	login: function(req,res) {
		autor.login(req,res);
	},
	autorizza: function(req,res,next) {
		return autor.autorizza(req,res,next);
	}
};

module.exports = controllers;