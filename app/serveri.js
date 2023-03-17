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

    let query = "SELECT * from kirjasarja";

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

app.post('/kayttaja', (req,res) => {

    console.log("/asiakas. BODY:" ,req.body);

    let kayttajaNimi = req.body.nimi;
    let kayttajaSalasana = req.body.salasana;

    let query = "INSERT INTO kayttaja (nimi, salasana) values (?, ?)";

    console.log("Post query:" + query);

    connection.query(query, [kayttajaNimi,kayttajaSalasana], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kayttajaNimi : kayttajaNimi, kayttajaSalasana : kayttajaSalasana})
        }
    })


});

app.get('/kayttaja', function (req,res) {

    let enimi = req.query.nimi || "";

    let esalasana = req.query.salasana || "";

    let query = "SELECT nimi, salasana from kayttaja WHERE 1=1";


    if (enimi != "") 
        query=query + " AND nimi like '" + enimi + "'";

    if (esalasana != "")
        query=query + "AND salasana like '" + esalasana + "'";

    console.log("GET QUERY:" + query);
    

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



app.get('/kirja', function (req,res) {
    
    let idkirjasarja = req.query.idkirjasarja || "";

    let id = req.query.id || "";

    let query = "SELECT * from kirja WHERE 1=1";

    if (idkirjasarja != "")
        query=query + " AND idkirjasarja = '" + idkirjasarja + "'";

    if (id != "")
        query=query + " AND id='" + id + "'";    


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