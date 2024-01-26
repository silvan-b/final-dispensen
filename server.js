/* *******************************************************************************************
* Autor: V. Demir, 1/2024
* *******************************************************************************************
* Beschreibung:
* Express-Server, um CRUD-Operationen vom Browser entgegen zunehmen an der DB durchzuführen
* *******************************************************************************************
* Hinweise
* npm install node
* npm init -y
* npm install mysql
* npm install body-parser
* npm install express
** ***************************************************************************************** */
// Referenz: www.npmjs.com/package/mysql

const mysql = require("mysql");
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

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
    /*
     var sqlstmt = 'SELECT * from user';
     // Das SQL-Statement wird vorbereitetet
     connection.query(sqlstmt, function (err, result) {
         if (err) throw err;
         // console.log('Data from MySQL:');
         //console.log(result); //
     });
     */
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//Zeigt alle
app.get('/user', (req, res) => {
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

//Zeigt nur einer mit user/:id
app.get('/user/:userID', (req, res) => {
    connection.query('SELECT * FROM user WHERE userID = ?', [req.params.userID], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }

    })
});

//löscht einen user mit user/:id
app.delete('/user/:userID', (req, res) => {
    connection.query(' DELETE FROM user WHERE userID = ?', [req.params.userID], (err, rows, fields) => {
        if (!err) {
            res.send('Delete operation was successful')
            // res.send(rows)
        } else {
            console.log(err);
        }

    })
});



//Test
/*
window.onload = function() {
    // Hier können Sie auf das document-Objekt zugreifen
    index.html
};


const tableBody = document.getElementById('table-body');

results.forEach((row) => {
    const tr = document.createElement('tr');

    Object.values(row).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
    });
})
*/