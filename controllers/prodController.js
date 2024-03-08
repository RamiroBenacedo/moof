const db = require('../database/models');

const prodController = {

    miProductora: function (req, res){
        res.render('miProductora')
    },

    crearEvento: function (req, res){
      console.log(req.params.id)
      res.render('crearEvento')
  },

  eventoStore: function(req, res){
    console.log("hola")
    let info = req.body;
    let idProd = req.params.id;
    /* res.send(info) */
    let errors = {}
    if (info.nombre == ""){
      errors.message = 'El nombre esta vacio'
      res.locals.errors = errors;
      return res.render('crearEvento')
    } 
    else{
      let nuevoEvento = {
        id_prod: idProd,
        nombre: info.nombre,
        capacidad: info.capacidad,
        ubicacion: info.ubicacion,
        categoria: info.categoria,
        descripcion: info.descripcion,
        venue : info.venue,
        imagen: info.imagen,
        video: info.video
      }
      console.log(nuevoEvento)
      db.Eventos.create(nuevoEvento)
      .then((result) => {
        console.log(result.id)
        return res.redirect('/index')
      })
      .catch((error) => {
        return res.send(error);
    })
    }
  }

}


module.exports = prodController;