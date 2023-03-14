var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

let portti = 3004;
let osoite = "127.0.0.1";
// http osoite: http://localhost:3004/kirja/


app.use(bodyParser.json());

var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',      
    password : 'root',
    database : 'kirjaarkisto',
    dateStrings : true,
});

app.get('/kirjasarja', function (req,res) {

    let query = "SELECT kirjasarja from kirjasarja";

    connection.query(query, function(error, result){

        if (error) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti: "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
        }
    });
});

app.get('/kirja', function (req,res) {
    
    let id = req.query.id || "";

    let enimi = req.query.nimi || "";

    let jaarjestysnumero = req.query.jarjestysnumero || "";

    let kuuvausteksti = req.query.kuvausteksti || "";

    let kiirjailija = req.query.kirjailija || "";

    let piiirtajat = req.query.piirtajat || "";

    let eensipainovuosi = req.query.ensipainovuosi || "";

    let paainokset = req.query.painokset || "";

    let query = "SELECT id, nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainovuosi, painokset from kirja WHERE 1=1";

    let query2 = "SELECT * from kirja";

    if (enimi != "") 
        query = query + " AND nimi like '" + enimi + "%'";
        
    if (jaarjestysnumero != "") 
        query = query + " AND jarjestysnumero like '" + jaarjestysnumero + "%'";
        
    if (kuuvausteksti != "") 
        query = query + " AND kuvausteksti like '" + kuuvausteksti + "%'";
        
    if (kiirjailija != "") 
        query = query + " AND kirjailija like '" + kiirjailija + "%'";
        
    if (piiirtajat != "")
        query = query + " AND piirtajat like '" + piiirtajat + "%'";

    if (eensipainovuosi != "")
        query = query + " AND ensipainovuosi like '" + eensipainovuosi + "%'";

    if (paainokset != "")
        query = query + " AND painokset like '" + paainokset + "%'";

    connection.query(query, function(error, result){

        if ( error ) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti : "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
            
        }
    });

    
});


app.listen(portti, osoite, () => {

});

module.exports = app