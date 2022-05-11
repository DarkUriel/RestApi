const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');

//Metodo GET
router.get('/Sale', (req, res) => {
    mysqlConnection.query('SELECT * FROM Venta', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/Sale/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM Venta WHERE Id_Venta = ?', [id], (err, rows, fields) => {
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

router.post('/Sale/', (req, res) => {
    const { Fecha, Vendedor, Num_Factura, TotalPagar, Id_Cliente, Id_Empleado } = req.body;
    const query = "INSERT INTO Venta (Fecha, Vendedor, Num_Factura, TotalPagar, Id_Cliente, Id_Empleado) VALUES (?, ?, ?, ?, ?, ?)";
    const id = null;
    mysqlConnection.query(query, [Fecha, Vendedor, Num_Factura, TotalPagar, Id_Cliente, Id_Empleado], (err, rows, fields) => {
        if (!err) {
            //res.json({ Status: "Ok" });
            mysqlConnection.query('SELECT Id_Venta FROM Venta ORDER BY Id_Venta DESC LIMIT 1', (err, rows, fields) => {
                res.json(rows[0]);
            });
        } else {
            console.log(err);
        }
    });
});


module.exports = router;