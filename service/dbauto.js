let request = require('request');
const maria = require('mariadb'); // driver per comunicare con il database MariaDB/MySQL
const datiConnessione = {
	host: 'localhost',
	//host: '192.168.43.52',
	port: '3306', // porta di default di MySQL
	user: 'node',
	password: 'node',
	database: 'test'
};
// Massimo
/*const datiConnessione = {
	host: '192.168.1.7',
	port: '3306',
	user: 'master',
	password: '',
	database: 'test'
};*/
let autos = {
	findSome: function (req, res) {
		maria.createConnection(datiConnessione)
		.then( conn => {
			conn.query("select * from automobili order by prezzo desc limit " + req.params.num )
				.then(rows => {
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	},
	findAll: function (req, res, next) {
		maria.createConnection(datiConnessione)
		.then(conn => {
			let opzione = req.params.tipo == '1' ? "IS NULL" : "IS NOT NULL";
			conn.query("select * from automobili where targa " + opzione)
				.then(rows => {
					//let json = JSON.stringify(rows); // il risultato è in Json
					//console.log(json); // va nella console del server
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	},
	findOne: function (req, res, next) {
		maria.createConnection(datiConnessione)
		.then(conn => {
			conn.query("select * from automobili where id = " + req.params.id )
				.then( rows => {
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	},
	post: function (req, res) {
		maria.createConnection( datiConnessione )
		.then(conn => {
			conn.query(	"INSERT INTO automobili (marca,modello,prezzo,colore,targa) VALUES (?,?,?,?,?)",
				[req.body.marca, req.body.modello, req.body.prezzo, req.body.colore, req.body.targa] )
			.then( rows => {
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	},
	update: function (req, res) {
		maria.createConnection( datiConnessione )
		.then( conn => {
			/*let targa = req.body.targa==null ? "null" : "'"+ req.body.targa +"'";
			conn.query( "UPDATE automobili SET marca='"+req.body.marca+"', modello='"+req.body.modello+
			"', prezzo="+req.body.prezzo+", colore='"+req.body.colore+"', targa="+targa+" WHERE id="+req.body.id )*/
			conn.query(	"UPDATE automobili SET marca=?, modello=?, prezzo=?, colore=?, targa=? WHERE id=?",
				[req.body.marca, req.body.modello, req.body.prezzo, req.body.colore, req.body.targa, req.body.id] )
			.then( rows => {
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	},
	delete: function (req, res) {
		maria.createConnection( datiConnessione )
		.then( conn => {
			conn.query("delete from automobili where id = " + req.params.id )
				.then(rows => {
					res.send(rows);
					conn.end();
				})
				.catch(err => {
					res.send(err);
					console.log(err);
				});
		})
		.catch(err => {
			res.send(err);
			console.log(err);
		});
	}
};

module.exports = autos;