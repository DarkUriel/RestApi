const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');


//Metodo GET
router.get('/Order/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Cliente', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log({ Status: "Not Found" });
        }
    });
});

//Metodo Get con Id
router.get('/Order/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM Cliente WHERE Estado = ?', [id], (err, rows, fields) => {
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

router.post('/Order/', (req, res) => {
    const { Id_Login, Estado, Usuario, Clave } = req.body;
    const query = '';
    mysqlConnection.query(query, [Id_Login, Estado, Usuario, Clave], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Ok" });
        } else {
            console.log({ Status: "Not Found" });
        }
    });
});

module.exports = router;