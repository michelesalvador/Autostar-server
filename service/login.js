'use strict';

//import * as express from 'express';
//const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
//import * as jwt from 'jsonwebtoken';
//import * as fs from "fs";
const jwt = require('jsonwebtoken');
const fs = require("fs");
const expressJwt = require('express-jwt');

//const app = express();
//app.use(bodyParser.json());

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');
const publicKey = fs.readFileSync('./public.key');

module.exports = {
	login: function (req, res) {

		const email = req.body.email,
			password = req.body.password;

		/*if (validateEmailAndPassword()) {
			const userId = findUserIdForEmail(email);*/
		if (1) {
			const userId = "1234";
			const jwtBearerToken = jwt.sign(
				{
					sub: userId
				},
				RSA_PRIVATE_KEY,
				{
					algorithm: 'RS256',
					expiresIn: 1000
					//noTimestamp: true	// non fa generare lo "iat" (issued at)
				}
			);

			// rispedirlo all'utente come cookie (non va)
			res.cookie("SESSIONID", jwtBearerToken, { httpOnly: false, secure: false } /**/ );

			// Risposta a modo mio (ok)
			//res.send( { jwt: jwtBearerToken } );

			// Risposta nel body della risposta http
			res.status(200).json({
				accessToken: jwtBearerToken, 
				expiresIn: 1200
			});
		}
		else {
			// send status 401 Unauthorized
			res.sendStatus(401);
		}
	},
	autorizza: expressJwt({ secret: publicKey }),
	autorizza2: function ( req, res, next ) {
		let token = req.headers['authorization'];
		console.log( jwt.decode(token) );
		console.log( req.user );
		
		expressJwt({ secret: publicKey });
		console.log( req.user );
		
		if (token === null) {     
			var err = new Error('Not authorized! Go back!');
			err.status = 400;
			return next(err);
		} else {
			return next();
		}
	}
}

function validateEmailAndPassword() {
	if (email == 'bluelettrico@iol.it' && password == '1234')
		return true;
	else
		return false;
}
