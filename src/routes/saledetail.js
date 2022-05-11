const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');

//metodo GET
router.get('/SaleDetail/', (req, res) => {
    mysqlConnection.query('SELECT * FROM VentaDetalle', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/SaleDetail/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM VentaDetalle WHERE Id_VentaDetalle = ?', [id], (err, rows, fields) => {
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


module.exports = router;