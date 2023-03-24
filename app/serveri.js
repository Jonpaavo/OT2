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

app.get('/omatsarjat', function (req,res) {

    let query = "SELECT * from omatsarjat WHERE 1=1";

    let kayttajaid = req.query.kayttajaid;

    if (kayttajaid != "" )
        query = query+ " AND kayttajaid like '" + kayttajaid + "'";

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

app.post('/omatsarjat', (req,res) => {

    let kirjasarja = req.body.kirjasarja;
    let kuvaus = req.body.kuvaus;
    let kustantaja = req.body.kustantaja;
    let luokittelu = req.body.luokittelu;
    let kayttajaid = req.body.kayttajaid;

    let query = "INSERT INTO omatsarjat (kirjasarja, kuvaus, kustantaja, luokittelu, kayttajaid) values (?, ?, ?, ?, ?)";

    connection.query(query, [kirjasarja, kuvaus, kustantaja, luokittelu, kayttajaid], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {
            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kirjasarja : kirjasarja, kuvaus : kuvaus, kustantaja : kustantaja, luokittelu : luokittelu, kayttajaid : kayttajaid});
        }

    });



})

app.post('/kirjasarja', (req,res) => {

    let kirjasarja = req.body.kirjasarja;
    let kuvaus = req.body.kuvaus;
    let kustantaja = req.body.kustantaja;
    let luokittelu = req.body.luokittelu;
    let query = "INSERT INTO kirjasarja (kirjasarja, kuvaus, kustantaja, luokittelu) values (?, ?, ?, ?)";

    connection.query(query, [kirjasarja, kuvaus, kustantaja, luokittelu], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {
            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kirjasarja : kirjasarja, kuvaus : kuvaus, kustantaja : kustantaja, luokittelu : luokittelu});
        }

    });
})

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

    let nimi = req.query.nimi;

    let salasana = req.query.salasana;

    let id = req.query.id;

    let query = "SELECT * from kayttaja WHERE 1=1";

    if (nimi != "") 
        query=query + " AND nimi like '" + nimi + "'";

    if (salasana != "")
        query=query + " AND salasana like '" + salasana + "'";

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

app.get('/omakirja', function (req,res) {
    
    let idomatsarjat = req.query.idomatsarjat || "";

    let id = req.query.id || "";

    let query = "SELECT * from omakirja WHERE 1=1";

    if (idomatsarjat != "")
        query=query + " AND idomatsarjat = '" + idomatsarjat + "'";

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

app.post('/omakirja', (req,res) => {

    let nimi = req.body.nimi;
    let jarjestysnumero = req.body.jarjestysnumero;
    let kuvausTeksti = req.body.kuvausteksti;
    let kirjailija = req.body.kirjailija;
    let piirtajat = req.body.piirtajat;
    let ensipainovuosi = req.body.ensipainovuosi;
    let painokset = req.body.ensipainovuosi;
    let idomatsarjat = req.body.idomatsarjat;

    let query = "INSERT INTO omakirja (nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainovuosi, painokset, idomatsarjat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";


    connection.query(query, [nimi,jarjestysnumero,kuvausTeksti,kirjailija,piirtajat,ensipainovuosi,painokset,idomatsarjat], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, nimi : nimi, jarjestysnumero : jarjestysnumero, kuvausTeksti : kuvausTeksti, kirjailija : kirjailija, piirtajat : piirtajat, ensipainovuosi : ensipainovuosi, painokset : painokset, idomatsarjat : idomatsarjat    })
        }
    })

})

app.post('/kirja', (req,res) => {

    let nimi = req.body.nimi;
    let jarjestysnumero = req.body.jarjestysnumero;
    let kuvausTeksti = req.body.kuvausteksti;
    let kirjailija = req.body.kirjailija;
    let piirtajat = req.body.piirtajat;
    let ensipainovuosi = req.body.ensipainovuosi;
    let painokset = req.body.ensipainovuosi;
    let idKirjaSarja = req.body.idkirjasarja;

    let query = "INSERT INTO kirja (nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainovuosi, painokset, idkirjasarja) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";


    connection.query(query, [nimi,jarjestysnumero,kuvausTeksti,kirjailija,piirtajat,ensipainovuosi,painokset,idKirjaSarja], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, nimi : nimi, jarjestysnumero : jarjestysnumero, kuvausTeksti : kuvausTeksti, kirjailija : kirjailija, piirtajat : piirtajat, ensipainovuosi : ensipainovuosi, painokset : painokset, idKirjaSarja : idKirjaSarja})
        }
    })

})


app.listen(portti, osoite, () => {

});

module.exports = app