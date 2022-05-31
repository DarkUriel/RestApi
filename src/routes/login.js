const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');
var md5 = require('md5');

//Metodo GET
router.get('/Login/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Login', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ Status: "Empty" });
        }
    });
});

//Metodo Get con Id
router.get('/Login/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM Login WHERE Id_Login = ?', [id], (err, rows, fields) => {
        if (!err) {
            if (rows != 0) {
                res.json(rows[0]);
            } else {
                res.json({ Status: "Not Found" });
            }
        } else {
            console.log({ Status: "Not Found" });
        }
    });
});

router.post('/Login/', (req, res) => {
    var { Usuario, Clave } = req.body;
    const pass = md5(Clave);
    Clave = pass;
    const query = 'SELECT * FROM Login WHERE Usuario = ? AND Clave = ? AND Estado = 1';
    mysqlConnection.query(query, [Usuario, Clave], (err, rows, fields) => {
        if (rows != 0) {
            res.json('Found');
        } else {
            res.json('Not Found');
        }
    });
});

module.exports = router;
