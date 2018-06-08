var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = 4000;
var db = require('./queries');

let allTeams = []

app.get('/equipos', function (req, res, next) {
    let url = "http://es.fifa.com/fifa-world-ranking/ranking-table/men/index.html";

    request(url, function (err, resp, body) {
        if (err) {
            console.log(err);
        } else {
            let $ = cheerio.load(body);

            $(".anchor").each(function () {
                let rannking = $(this).find('.tbl-rank').text();
                let nombre = $(this).find('.tbl-teamname a').text();
                let img = $(this).find('.tbl-teamname span img').attr("src");
                let puntos = $(this).find('.tbl-points').text();
                let puntosPrevios = $(this).find('.tbl-prevpoints').text();
                let prom = $(this).find('.tbl-points-avg').text();
                let rstl = $(this).find('.tbl-points-avg-weight').text();
                let confederationn = $(this).find('.tbl-confederation').text();

                let team = {
                    ranking: rannking,
                    name: nombre,
                    image: img,
                    points: puntos,
                    previousPoints: puntosPrevios,
                    prom2018: prom.slice(0, 6),
                    rstl2018: rstl.slice(0, 6),
                    prom2017: prom.slice(6, 12),
                    rstl2017: rstl.slice(6, 12),
                    confederation: confederationn
                }
                allTeams.push(team)
                db.any("SELECT Transaccion_InsertarPosiciones ('" + rannking + "','" + nombre + "','" + img + "','" + puntos + "','" + puntosPrevios + "','" + prom.slice(0, 6) + "','" + rstl.slice(0, 6) + "','" + prom.slice(6, 12) + "','" + rstl.slice(6, 12) + "','" + confederationn + "')")
                    .then(function () {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: 'Se agrego a la tabla de posiciones'
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            });
            res.send(allTeams);
        }
    });

})

console.log("server running on " + port);
app.listen(port);