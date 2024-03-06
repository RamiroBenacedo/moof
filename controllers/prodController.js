const db = require('../database/models');

const prodController = {

    miProductora: function (req, res){
        res.render('miProductora')
    },

    crearEvento: function (req, res){
        if (req.session.user != undefined) {
          return res.render('crearEvento')
      } else {
          return res.render('login')
      }
    },
    
    // el metodo relaciones publicas esta en la ruta de crearEvento tambien

    /* router.get('/crearEvento', prodController.crearEvento);
       router.get('/crearEvento', prodController.relacionesPublicas); */
    
    /*relacionesPublicas: function (req, res){
        if (req.session.user != undefined) {
            console.log('Esta entrando al if')
            const usuarioId = req.params.id;
            console.log(usuarioId);
            const criterio = {
                where: [{
                    id_prod: usuarioId
                }], 
                order: [['createdAt', 'DESC']],
                include: {all: true,nested: true}};
            db.RrppAlias.findAll(criterio)
            .then((result) => {
                if (result != null) {  
                    return res.render('crearEvent', { id_prod: usuarioId, Rrpp: result});          
                } else {
                    console.log("No hay RRPPs habilitados");
                    return res.render('crearEvent');
                }
            }).catch((error) => {
                console.error("Error en relaciones publicas:", error);
                res.status(500).send("Internal Server Error");
            });
        } else {
            return res.render('login');
        }
    }*/
}


module.exports = prodController;