const db = require('../database/models');

const prodController = {

    miProductora: function (req, res){
        res.render('miProductora')
    },

    crearEvento: function (req, res){
      if (req.session.user === undefined) {
      return res.render('login');
      } else {
      return res.render('crearEvento', {id: req.params.id});
      }
    },

  eventoStore: function(req, res){
    console.log("hola")
    let info = req.body;
    let idProd = req.params.id;
    console.log(req.params)
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
        id_evento = result.id
        return res.redirect(`/entradas/id/${id_evento}`)
      })
      .catch((error) => {
        return res.send(error);
    })
    }
  },

  entradas: function(req, res){
    res.render("entradas", {id: req.params.id})
  },

  /*entradas: function(req, res) {
    let id= req.params.id;
    let criterio = {
        order: [['createdAt', 'DESC']], 
        where: [{ id_evento: id }],
        include: {
          all: true,
          nested: true
        }
      }
    db.EntradasAlias.findAll(criterio)
    .then(function(result){
        return res.render('entradas', { id: req.params.id, entradas: result});
    })
    .catch(function (error) {
        return res.send(error)
    })
  },*/

  entradasStore: function(req, res){
    console.log(req.params.id)
    let info = req.body;
    let idEvento = req.params.id;
    let errors = {}
    if (info.nombre == ""){
      errors.message = 'El nombre esta vacio'
      res.locals.errors = errors;
      return res.render('entradas')
    } 
    else{
      console.log(idEvento)
      let nuevaEntrada = {
        id_evento: idEvento,
        nombre: info.nombre,
        descripcion: info.descripcion,
        valor: info.valor,
        cantidad: info.cantidad,
      }
      console.log(nuevaEntrada)
      db.EntradasAlias.create(nuevaEntrada)
      .then((result) => {
        console.log(result)
        return res.redirect(`/entradas/id/${idEvento}`)
      })
      .catch((error) => {
        return res.send(error);
    })
    }

},

  

}


module.exports = prodController;