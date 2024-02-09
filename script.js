/* *******************************************************************************************
* Autor: S.Buehlmann, C.Linder, 02/2024
* *******************************************************************************************
* Beschreibung:
* Express-Server, welcher html pages ausführt zusammen mit Funktionen via MySql die Datenbanken anzeigen.
* *******************************************************************************************
* Hinweise
* npm install node
* npm init -y
* npm install mysql
* npm install body-parser
* npm install express
** ***************************************************************************************** */
// Referenz: uebungen (www.ict.bzzlab.ch)

const http = require('http');
const mysql = require('mysql2');
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//connection zu DB

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

//User auswählen mit Submit Button

app.get('/select_user', (req, res) => {
    var html = '<form action="/user/" method="get"><label for="id">User ID:</label><br><input type="text" id="id" name="id"><br><br><input type="submit" value="Submit"></form>';
    res.send(html);
});

//Auswahl User

app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;

    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'WHERE u.userID = ?\n' +
        'ORDER BY u.userID', [userId], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                const userData = rows[0];
                var html = '<style>\n' +
                    '        /* Basic table styling */\n' +
                    '        table {\n' +
                    '            border-collapse: collapse;\n' +
                    '            width: 100%;\n' +
                    '            font-family: Arial, sans-serif;\n' +
                    '        }\n' +
                    '        th, td {\n' +
                    '            border: 1px solid #ddd;\n' +
                    '            padding: 8px;\n' +
                    '            text-align: left;\n' +
                    '        }\n' +
                    '        th {\n' +
                    '            background-color: #f2f2f2;\n' +
                    '        }\n' +
                    '    </style><table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
                html += '<tr><td>' + userData.userID + '</td><td>' + userData.name + '</td><td>' + userData.surname + '</td><td>' + userData.username + '</td><td>' + userData.location + '</td><td>' + userData.gender + '</td></tr>';
                html += '</table>';
                res.send(html);
            } else {
                res.send('User not found.');
            }
        } else {
            console.log(err);
            res.status(500).send('Error retrieving user data.');
        }
    });
});

//Users werden nicht dargestellt? - Darum Auskommentiert

/*
app.get('/users/', (req, res) => {
    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'ORDER BY u.userID', [req.params.userID], (err, rows, fields) => {
        if (rows.length > 0) {
            const userData = rows[0];
            var html = '<style>\n' +
                '        /* Basic table styling *//*\n' +
                '        table {\n' +
                '            border-collapse: collapse;\n' +
                '            width: 100%;\n' +
                '            font-family: Arial, sans-serif;\n' +
                '        }\n' +
                '        th, td {\n' +
                '            border: 1px solid #ddd;\n' +
                '            padding: 8px;\n' +
                '            text-align: left;\n' +
                '        }\n' +
                '        th {\n' +
                '            background-color: #f2f2f2;\n' +
                '        }\n' +
                '    </style><table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
            html += '<tr><td>' + userData.userID + '</td><td>' + userData.name + '</td><td>' + userData.surname + '</td><td>' + userData.username + '</td><td>' + userData.location + '</td><td>' + userData.gender + '</td></tr>';
            html += '</table>';
            res.send(html);
        } else {
            console.log(err);
        }

    })
});
*/

//einzelnen User mit ID zeigen
app.post('/user/', (req, res) => {
    const userId = req.body.id;
    console.log("User ID submitted:", userId); // Check if the user ID is received correctly

    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'WHERE u.userID = ?\n' +
        'ORDER BY u.userID', [userId], (err, rows, fields) => {
        if (!err) {
            console.log("Query result:", rows); // Check if the query returns any rows

            var html = '<style>\n' +
                '        /* Basic table styling */\n' +
                '        table {\n' +
                '            border-collapse: collapse;\n' +
                '            width: 100%;\n' +
                '            font-family: Arial, sans-serif;\n' +
                '        }\n' +
                '        th, td {\n' +
                '            border: 1px solid #ddd;\n' +
                '            padding: 8px;\n' +
                '            text-align: left;\n' +
                '        }\n' +
                '        th {\n' +
                '            background-color: #f2f2f2;\n' +
                '        }\n' +
                '    </style><table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
            for (var i = 0; i < rows.length; i++) {
                html += '<tr><td>' + rows[i].userID + '</td><td>' + rows[i].name + '</td><td>' + rows[i].surname + '</td><td>' + rows[i].username + '</td><td>' + rows[i].location + '</td><td>' + rows[i].gender + '</td></tr>';
            }
            html += '</table>';
            res.send(html);
        } else {
            console.log("Query error:", err); // Log any query errors
            res.status(500).send("Error fetching user information"); // Send an error response
        }
    });
});

//Falls keine ID Angegeben, Error Message, Sonst anzeige von User
app.get('/user', (req, res) => {
    const userId = req.query.id; // Get the user ID from the query parameters

    if (!userId) {
        res.send("Please provide a user ID.");
        return;
    }

    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'WHERE u.userID = ?\n' +
        'ORDER BY u.userID', [userId], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            if (rows.length > 0) {
                var html = '<style>\n' +
                    '        /* Basic table styling */\n' +
                    '        table {\n' +
                    '            border-collapse: collapse;\n' +
                    '            width: 100%;\n' +
                    '            font-family: Arial, sans-serif;\n' +
                    '        }\n' +
                    '        th, td {\n' +
                    '            border: 1px solid #ddd;\n' +
                    '            padding: 8px;\n' +
                    '            text-align: left;\n' +
                    '        }\n' +
                    '        th {\n' +
                    '            background-color: #f2f2f2;\n' +
                    '        }\n' +
                    '    </style><table><tr><th>User ID</th><th>Name</th><th>Surname</th><th>Username</th><th>Location</th><th>Gender</th></tr>';
                html += '<tr><td>' + rows[0].userID + '</td><td>' + rows[0].name + '</td><td>' + rows[0].surname + '</td><td>' + rows[0].username + '</td><td>' + rows[0].location + '</td><td>' + rows[0].gender + '</td></tr>';
                html += '</table>';
                res.send(html);
            } else {
                res.send('User not found.');
            }
        } else {
            console.log(err);
        }
    });
});


//Anzeigen alle User ohne Styling via html (zeigt gleich wie Postman)

app.get('/allusers/', (req, res) => {
    connection.query('SELECT u.userID, u.name, u.surname, l.username, loc.location, g.gender\n' +
        'FROM user AS u\n' +
        'INNER JOIN login AS l ON u.loginID = l.loginID\n' +
        'INNER JOIN locations AS loc ON u.locationID = loc.locationID\n' +
        'INNER JOIN gender AS g ON u.genderID = g.genderID\n' +
        'ORDER BY u.userID', [req.params.userID], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }

    })
});

//Löschen von einem User, nach / wird ID eingegeben - funktioniert über Postman
app.delete('/delete/:userID', (req, res) => {
    connection.query(' DELETE FROM user WHERE userID = ?', [req.params.userID], (err, rows, fields) => {
        if (!err) {
            res.send('Delete operation was successful')
            // res.send(rows)
        } else {
            console.log(err);
        }

    })
});

//Message in Console, dass connected ist
http.createServer(app).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
