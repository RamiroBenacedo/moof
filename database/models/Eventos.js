module.exports = function (sequelize, dataTypes) {
    let alias = "Eventos";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_prod: {
            type: dataTypes.INTEGER,
            foreignKey: {
                model: '/Productoras.js',
                key: 'id',
              }
        },
        nombre: {
            type: dataTypes.STRING
        },
        capacidad: {
            type: dataTypes.STRING
        },
        ubicacion: {
            type: dataTypes.STRING,
        },
        categoria: {
            type: dataTypes.STRING,
        },
        descripcion: {
            type: dataTypes.STRING,
        },
        venue: {
            type: dataTypes.STRING,
        },
        imagen: {
            type: dataTypes.STRING,
        },
        video: {
            type: dataTypes.STRING,
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
        deletedAt: {
            type: dataTypes.DATE,
        }
    }


    let config = {
        tableName: "eventos", timestamps: true, underscore: true
    }

    let Eventos = sequelize.define(alias, cols, config);
    //relaciones
    // Un evento pertenece a una productora 
    Eventos.associate = function (models) {
        Eventos.belongsTo(models.Productoras, {
            as: "eventos",
            foreignKey: "id_prod",
        })
    }
    // Un evento tiene muchas entradas
    Eventos.associate = function (models) {
        Eventos.hasMany(models.EntradasAlias, {
            as: "eventos",
        })
    }

    return Eventos;
}