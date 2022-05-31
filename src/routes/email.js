const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mysqlConnection = require('../database');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: "josejusto.cruzzarate@gmail.com",
        clientId: "477367926687-3mqkf228sucdn7kouuhc2rpsvefgce0g.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04pLSxArg7p7kCgYIARAAGAQSNwF-L9IrXR0xN4X08Qx-6lfnYlhHKJZtZHqDh8YI98Zsa6fbrEIKGougRO9pm4U-YRqPBAQ3Vfs",
        accessToken: "ya29.a0ARrdaM8VO7G3P-PgumnRx4giGzyTNMaMUoXd5rlD6j9eTxRjUgRbdONJJzWkWTmiT2ucbOpuAELmUSX0mXGKCpv3uwFKKIalReh1hc6hYTa0xAP9lIJn7T1Tvuen7fU9Vy-9zhHzmYXK_SpTWeHBnRGHQ18Q",
        expires: 1484314697598,
    },
});

router.post('/Email/', (req, res) => {
    const { Descripcion } = req.body;
    transporter.sendMail({
            from: '🍕🍕🍕 Facturacion <josejusto.cruzzarate@gmail.com>',
            to: Descripcion[1],
            subject: 'Facturacion',
            html: Descripcion[0]
        })
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(result)
        });
});

module.exports = router;