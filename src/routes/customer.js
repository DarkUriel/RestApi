const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');


//Metodo GET
router.get('/Customer/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Cliente', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Metodo Get con Id
router.get('/Customer/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM Cliente WHERE Id_Cliente = ?', [id], (err, rows, fields) => {
        if (!err) {
            if (rows != 0) {
                res.json(rows[0]);
            } else {
                res.json({ Status: "Not Found" });
            }
        } else {
            console.log(err);
        }
    });
});

router.post('/Customer/', (req, res) => {
    const { CI_NIT, Nombre, Apellidos, Estado } = req.body;
    const query = 'INSERT INTO Cliente (CI_NIT, Nombre, Apellidos, Estado) VALUES (?, ?, ?, ?)';
    mysqlConnection.query(query, [CI_NIT, Nombre, Apellidos, Estado], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Ok" });
        } else {
            console.log(err);
        }
    });
});

router.put('/Customer/', (req, res) => {
    const { Id_Cliente, CI_NIT, Nombre, Apellidos, Estado } = req.body;
    const query = 'UPDATE Cliente SET CI_NIT = ?, Nombre = ?, Apellidos = ?, Estado = ? WHERE Id_Cliente = ?';
    mysqlConnection.query(query, [CI_NIT, Nombre, Apellidos, Estado, Id_Cliente], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Ok" });
        } else {
            console.log(err);
        }
    })
});

module.exports = router;