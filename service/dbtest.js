// Prova di connessione al database: 'node service/dbtest.js'

const maria = require('mariadb');

maria.createConnection({
	host: 'localhost',
	//port: '3306',
	user: 'node',
	password: 'node',
	database: 'test'
})
	.then(conn => {
		conn.query("select * from automobili")
			.then(rows => {
				let json = JSON.stringify(rows);
				console.log(json); // va nella console del server
				conn.end();
			})
			.catch(err => {
				console.log(err);
			});
	})
	.catch(err => {
		console.log(err);
	});
