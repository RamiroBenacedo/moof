const bcrypt = require('bcrypt');
const db = require('../database/models');

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

    login: function (req, res) {
        if (req.session.user != undefined) {
          return res.redirect('index')
      } else {
          return res.render('login')
      }
    },

    
        loginPost: (req, res) => {
          let emailBuscado = req.body.email;
          let contrasena = req.body.contrasena;   
      /*      res.send(contrasena)
       */     let rememberMe=req.body.rememberMe;      
          
          let errors = {}
          if (emailBuscado == ''){
            errors.message ="El email esta vacio"
            res.locals.errors = errors;
            return res.render('login')
          }
          else if (contrasena == "") {
            errors.message = "El campo de contraseña esta vacio";
            res.locals.errors = errors;
            return res.render("login");
          } else {
              let criterio = {
              where: [{email: emailBuscado}]
          };
      
          db.Productoras.findOne(criterio)
          .then((result) => {
            if (result != null) {
            let check =  bcrypt.compareSync(contrasena, result.contrasena)
            console.log(check)
            console.log(contrasena)
            console.log(result.contrasena)
      /*       return res.send(check)
       */                    
            if (check) {
              req.session.user = result.dataValues;
      /*         res.send(req.session.user)
       */        
              if (rememberMe) {
              res.cookie('userId', result.id, {maxAge:1000 * 60 * 5})
              res.send(rememberMe)
              }
              return res.redirect("index")}
              else {
                errors.message = "La contraseña es incorrecta";
                res.locals.errors = errors;
                return res.render("login")
              }} 
              else {
                errors.message = "No existe el mail " + emailBuscado;
                res.locals.errors = errors
                res.render('login')
                }
                
            }).catch((error) => {
                return res.send(error);
            })}},
    
  
    logout: function (req, res) {
      req.session.destroy()
      res.clearCookie("userId")
      return res.render("login")
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
      else{
        let nuevaProductora = {
              nombre: info.nombre,
              contrasena: bcrypt.hashSync(info.contrasena, 10),
              email: info.email
        }

        db.Productoras.create(nuevaProductora)
        .then((result) => {
          console.log(result)
          return res.redirect('/login')
      })
        .catch((error)=> {

          error.errors.forEach(item => {

            if (item.validatorKey == "not_unique") {
              let errors = {};
              console.log(error);
              errors.message = "El email está repetido";
              res.locals.errors = errors;
              return res.render('registro')
            }
            
          });

        });
      }
      }
}
    
module.exports = mainController;