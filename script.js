const http = require('http');
const mysql = require("mysql");
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const config = {
    host: 'localhost',
    database: 'dispensen',
    user: "dispensAdmin",
    password: 'dispensAdminPW'
}

const connection = mysql.createConnection(config)

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database:', connection.config.database);
});


app.get('/user', (req, res) => {
    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'ORDER BY u.userID', [req.params.userID], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            var html = '<table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td>' + rows[i].userID + '</td><td>' + rows[i].name + '</td><td>' + rows[i].surname + '</td><td>' + rows[i].username + '</td><td>' + rows[i].location + '</td><td>' + rows[i].gender + '</td></tr>';
            }
            html += '</table>';
            res.send(html);
        } else {
            console.log(err);
        }

    })
});

app.post('/user/:id', (req, res) => {
    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'WHERE u.userID = ?\n' +
        'ORDER BY u.userID', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            var html = '<table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td>' + rows[i].userID + '</td><td>' + rows[i].name + '</td><td>' + rows[i].surname + '</td><td>' + rows[i].username + '</td><td>' + rows[i].location + '</td><td>' + rows[i].gender + '</td></tr>';
            }
            html += '</table>';
            res.send(html);
        } else {
            console.log(err);
        }

    })
});

app.get('/select_user', (req, res) => {
    var html = '<form action="/user/id/" method="post"><label for="id">User ID:</label><br><input type="text" id="id" name="id"><br><br><input type="submit" value="Submit"></form>';
    res.send(html);
});

http.createServer(app).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
