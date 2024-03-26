const db = require('../database/models');
const fs = require('fs');
const QRCode = require('qrcode');
const uuid = require('uuid');


const eventController = {

    evento: function(req, res){
        res.render("evento")
    },

    codigos: function (req, res) {
        let idEntrada = uuid.v4();
        let qrContent = `ID de entrada: ${idEntrada}`;
        let directory = '../moof/controllers/entradasQR/Ancla'; // Se almacena a la altura de la ultima carpeta, no dentro de ella
        let filename = `${idEntrada}.png`;
        QRCode.toFile(`${directory}${filename}`, qrContent, (err) => {
            if (err) {
                console.error(`Error al generar el código QR: ${err}`);
            } else {
                console.log(`Código QR para la entrada ${idEntrada} generado exitosamente.`);
                res.redirect('/index'); 
            }
        });     
    }

}

module.exports = eventController;