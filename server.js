const express = require('express'); // gestisce le url
const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());

// Metodo "vecchio"
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended:false} ));
app.use( bodyParser.json() );

/* Metodo più nuovo per express >= 4.16.0, senza body-parser
app.use(express.json()); // per decodificare i post json
app.use(express.urlencoded({  // per decodificare i post da un form HTML
	extended: true
}));*/

// Per caricare pagine statiche che vengono prese dalla cartella /public
app.use( express.static('public') );

const port = process.env.PORT || 8080;

const routes = require('./api/routes');
routes(app);

app.listen(port, function () {
	console.log('Server partito sulla porta ' + port);
});
