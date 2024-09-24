/*
 * @file app.js
 * @author William Robert
 * @version 1.00
 * @date 2024/09/09
 * @brief Création d’un site modulaire sous NodeJs avec Express
 */


var express = require('express');
var app = express();
var m1, m2, m3, m4, m5, m6 = false;
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
            m1 = !m1;
            idString = m1 ? 'on' : 'off';
            break;
        case '2':
            m2 = !m2;
            idString = m2 ? 'on' : 'off';
            break;
        case '3':
            m3 = !m3;
            idString = m3 ? 'on' : 'off';
            break;
        case '4':
            m4 = !m4;
            idString = m4 ? 'on' : 'off';
            break;
        case '5':
            m5 = !m5;
            idString = m5 ? 'on' : 'off';
            break;
        case '6':
            m6 = !m6;
            idString = m6 ? 'on' : 'off';
            break;
        case 'reset':
            m1 = m2 = m3 = m4 = m5 = m6 = false;
            idString = 'reset';
            break;
        case 'controle':
            idString = '1=' + (m1 ? 'on' : 'off') + '   '
                + '2=' + (m2 ? 'on' : 'off') + '   '
                + '3=' + (m3 ? 'on' : 'off') + '   '
                + '4=' + (m4 ? 'on' : 'off') + '   '
                + '5=' + (m5 ? 'on' : 'off') + '   '
                + '6=' + (m6 ? 'on' : 'off');
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