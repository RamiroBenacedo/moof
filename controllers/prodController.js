const db = require('../database/models');

const prodController = {

    miProductora: function (req, res){
        res.render('miProductora')
    },

    crearEvento: function (req, res){
        if (req.session.user != undefined) {
          return res.redirect('crearEvento')
      } else {
          return res.render('login')
      }
    },
    
    // el metodo relaciones publicas esta en la ruta de crearEvento tambien

    /* router.get('/crearEvento', prodController.crearEvento);
       router.get('/crearEvento', prodController.relacionesPublicas); */
    
    relacionesPublicas: function (req, res){
        const usuarioId = req.session.user.id;
        console.log(usuarioId)
        const criterio = {where: [{id_prod: usuarioId}], order: [['createdAt', 'DESC']]};
        db.Rrpp.findAll(criterio)
        .then((result) => {
            if (result != null) {  
                var rrpps = result
                res.send(rrpps)           
            }  
        }).catch((error) => {
            console.error("Error en relaciones publicas:", error);
            res.status(500).send("Internal Server Error");
        })
    }
    
}


module.exports = prodController;