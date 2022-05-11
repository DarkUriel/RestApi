const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');

//metodo GET
router.get('/Tmp/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tmp', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/Tmp/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM tmp WHERE Id_Temporal = ?', [id], (err, rows, fields) => {
        if (!err) {
            if (rows != 0) {
                res.json(rows[0]);
            } else {
                res.json({ Status: "Not Found." });
            }
        } else {
            console.log(err);
        }
    });
});

router.post('/Tmp/', (req, res) => {
    const { Cantidad, Id_Menu, Id_Producto, Id_MenuDetalle } = req.body;
    const query = "INSERT INTO tmp (Cantidad, Id_Menu, Id_Producto, Id_MenuDetalle) VALUES (?, ?, ?, ?)";
    mysqlConnection.query(query, [Cantidad, Id_Menu, Id_Producto, Id_MenuDetalle], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Ok" });
        } else {
            res.json({ Status: "Null" });
        }
    });
});

router.put('/Tmp/', (req, res) => {
    const { Cantidad, Id_Temporal } = req.body;
    const query = "UPDATE tmp SET Cantidad = ? WHERE Id_Temporal = ?";
    mysqlConnection.query(query, [Cantidad, Id_Temporal], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Ok" });
        } else {
            res.json({ Status: "Null" });
        }
    });
});

module.exports = router;