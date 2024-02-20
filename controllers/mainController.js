const bcrypt = require('bcrypt');
const db = require('../database/models');
const Productoras = require('../models/Productoras');

const mainController = {

    index: function (req, res){
        res.render('index')
    }
    ,
    
    crearEvento: function (req, res){
        res.render('crearEvento')
    },

    features: function (req, res){
        res.render('features')
    },

    partners: function (req, res){
        res.render('partners')
    },

    login: function (req, res){
        res.render('login')
    },

    registro: function (req, res){
        res.render('registro')
    },
 
    store: function(req, res){
        let info = req.body;
         /* res.send(info) */
         let errors = {}
        if (info.email == ""){
          errors.message = 'El email esta vacio'
          res.locals.errors = errors;
          res.render('registro')
        } 
        else if (info.contrasena == ""){
          errors.message = 'La contrasena esta vacia'
          res.locals.errors = errors;
          res.render('registro')
        }
        else if (info.contrasena.length < 3){
            errors.message = 'La contrasena debe tener mas de 3 caracteres'
            res.locals.errors = errors;
            res.render('registro')
        }
        else if (info.nombre == ""){
            errors.message = 'Debes tener un nombre de usuario'
            res.locals.errors = errors;
            res.render('registro')
        }
        else if (info.nombre.length < 4){
          errors.message = 'Tu nombre debe tener mas de 4 caracteres'
          res.locals.errors = errors;
          res.render('registro')
      }
      /*
    else{ 
      console.log(info)
    
      db.Productoras.findOne({where:[{email: info.email}]})
      .then(function (result) {
        if (result != undefined) {
          errors.message = "El email ingresado ya esta registrado";
          res.locals.errors = errors;
          return res.render("registro");
        }*/
        else{
      let Productora = {
          nombre: info.nombre,
          contrasena: bcrypt.hashSync(info.contrasena, 10),
          email: info.email,
          remember_token: "false"
        }}
        db.Productoras.create(Productora)
        .then((result) => {
          console.log(result)
          return res.redirect('/login')
       })
        .catch((error)=> {
          let errors = {};
          console.log(error);
          errors.message = "El campo email esta repetido";
          res.locals.errors = errors;
          return res.redirect("registro")
        });
      }
      // })
      ,

}
    
module.exports = mainController;