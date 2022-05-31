const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');

//Metodo Get productos
router.get('/Products/', (req, res) => {
    var query = `SELECT Producto.Id_Producto, Producto.Id_Categoria, Producto.Nombre, 
    Producto.Precio, Producto.Descuento, Producto.Imagen, Producto.RutaImagen, 
    Categoria.Nombre as NombreCategoria, MenuDetalle.Id_MenuDetalle, 
    MenuDetalle.Cantidad, Menu.Id_Menu, Menu.Fecha FROM Producto INNER JOIN 
    Categoria ON Categoria.Id_Categoria = Producto.Id_Categoria INNER JOIN 
    MenuDetalle ON MenuDetalle.Id_Producto = Producto.Id_Producto INNER JOIN
    Menu ON Menu.Id_Menu = MenuDetalle.Id_Menu WHERE Menu.Fecha = "2022-05-09"`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            var json = new Array();
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});
module.exports = router;