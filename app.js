/*
 * @file app.js
 * @author William Robert
 * @version 1.00
 * @date 2024/09/09
 * @brief Création d’un site modulaire sous NodeJs avec Express
 */


const { every } = require('async');
const e = require('express');
var express = require('express');
var app = express();
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');
client.subscribe('MODULE/#');
client.on('connect', function () {
    console.log("MQTT connecté !");
});
client.publish('MODULE/1', 'off');
client.on('message', function (topic, message) {
    if (topic.indexOf("MODULE") !== -1)
    {
        var numModule = parseInt(topic.split("/").pop()); 
        if (numModule >= 1 && numModule <= 6) {
            if (message.toString() === 'on') {
                m[numModule - 1] = true;
            } else if (message.toString() === 'off') {
                m[numModule - 1] = false;
            }
        } else if (numModule === 0) {
            
            if (message.toString() === 'on') {
                m.forEach(function (element, index) {
                m[index] = true;
                });
            } else if (message.toString() === 'off') {
                m.forEach(function (element, index) {
                m[index] = false;
                });
            }
        }
    }
});
const m = [0,0,0,0,0,0];
var idString;
app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/contact', function (req, res) {
    res.send(
            '<!DOCTYPE html>'
        +   '<html lang="fr">'
        +   '<head>'
        +       '<meta charset="UTF-8">'
        +       '<title>Super Awesome</title>'
        +       '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">'
        +   '</head>'
        +   '<body class="container">'
        +       '<header>'
        +           '<nav class="navbar navbar-default" role="navigation">'
        +               '<div class="container-fluid">'
        +                   '<div class="navbar-header">'
        +                       '<a class="navbar-brand" href="#">'
        +                           '<span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>'
        +                           'EJS Is Fun'
        +                       '</a>'
        +                   '</div>'
        +                   '<ul class="nav navbar-nav">'
        +                       '<li><a href="/">Home</a></li>'
        +                       '<li><a href="/contact">Contact</a></li>'
        +                   '</ul>'
        +               '</div>'
        +           '</nav>'
        +       '</header>'
        
        +       '<main>'
        +           '<table class="table">'
        +               '<thead>'
        +                   '<tr>'
        +                       '<th>Nom</th>'
        +                       '<th>Prenom</th>'
        +                       '<th>Adresse</th>'
        +                       '<th>Telephone</th>'
        +                       '<th>Email</th>'
        +                   '</tr>'
        +               '</thead>'
        +               '<tbody>'
        +                   '<tr>'
        +                       '<td>Robert</td>'
        +                       '<td>William</td>'
        +                       '<td>69 rue Duquet</td>'
        +                       '<td>111-222-3333</td>'
        +                       '<td><a href="mailto:williamrobert1030@icloud.com">williamrobert1030@icloud.com</a></td>'
        +                   '</tr>'
        +                   '<tr>'
        +                       '<td>Gates</td>'
        +                       '<td>Bill</td>'
        +                       '<td>420 rue Microsoft</td>'
        +                       '<td>456-147-1245</td>'
        +                       '<td><a href="mailto:billgates@hotmail.com">billgates@hotmail.com</a></td>'
        +                   '</tr>'
        +               '</tbody>'
        +           '</table>'
        +       '</main>'

        +       '<footer>'
        +           '<p class="text-center text-muted">© Copyright 2024 William Robert</p>'
        +       '</footer>'

        +   '</body>'
        +   '</html>'
    );
});

app.get('/module/:id', function (req, res) {
    switch (req.params.id) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            var modId = parseInt(req.params.id);
            m[modId-1] = !m[modId-1];
            idString = m[modId-1] ? 'on' : 'off';
            break;
        
        case 'reset':
            m.forEach(function(element, index) {
                m[index] = false;
            });
            idString = 'reset';
            break;
        case 'controle':
            idString = "";
            m.forEach(function (element, index) {
                idString += (index + 1) + '=' + (element ? 'on' : 'off') + '   ';
            });
            break;
        default:
            idString = 'inconnu';
            break;
    }
    res.render('module.ejs', { id: idString });
});

app.use(function (req, res) {
    res.status(404).send(
            '<!DOCTYPE html>'
        +   '<html lang="fr">'
        +   '<head>'
        +       '<meta charset="UTF-8">'
        +       '<title>Super Awesome</title>'
        +       '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">'
        +   '</head>'
        +   '<body class="container">'
        +       '<header>'
        +           '<nav class="navbar navbar-default" role="navigation">'
        +               '<div class="container-fluid">'
        +                   '<div class="navbar-header">'
        +                       '<a class="navbar-brand" href="#">'
        +                           '<span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>'
        +                           'EJS Is Fun'
        +                       '</a>'
        +                   '</div>'
        +                   '<ul class="nav navbar-nav">'
        +                       '<li><a href="/">Home</a></li>'
        +                       '<li><a href="/contact">Contact</a></li>'
        +                   '</ul>'
        +               '</div>'
        +           '</nav>'
        +       '</header>'
        
        +       '<main>'
        +           '<div class="jumbotron">'
        +               '<p>404 Page introuvable</p>'
        +           '</div>'
        +       '</main>'

        +       '<footer>'
        +           '<p class="text-center text-muted">© Copyright 2024 William Robert</p>'
        +       '</footer>'

        +   '</body>'
        +   '</html>'
    );
});

app.listen(8080);