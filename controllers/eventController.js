const db = require('../database/models');
const fs = require('fs');
const QRCode = require('qrcode');
const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../moof/credentials.json');

const eventController = {

    evento: function(req, res){
        res.render("evento")
    },

    codigos: async function (req, res) {
        const bucketName = 'imagenesmoof';
        let idEntrada = uuid.v4();
        let qrContent = `ID de entrada: ${idEntrada}`;
        let filename = `${idEntrada}.png`;
        try {
            const s3 = new AWS.S3({ region: 'us-east-1' }); // Specify the correct region for your S3 bucket
            const params = {
                Bucket: bucketName,
                Key: filename,
                Body: await QRCode.toBuffer(qrContent)
            };
            await s3.upload(params).promise();
            console.log(`Código QR para la entrada ${idEntrada} generado exitosamente.`);
            res.redirect('/index');
        } catch (err) {
            console.error(`Error al generar el código QR: ${err}`);
        }
    }
    }



module.exports = eventController;