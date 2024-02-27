module.exports = function (sequelize, dataTypes) {
    let alias = "Rrpp";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_prod: {
            type: dataTypes.INTEGER,
            foreignKey: {
                model: 'Productoras.js',
                key: 'id',
              }
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.INTEGER,
        },
        alias_pagos: {
            type: dataTypes.STRING,
        },
    }


    let config = {
        tableName: "rrpp", timestamps: true, underscore: true
    }

    let Rrpp = sequelize.define(alias, cols, config);
    //relaciones
    // Un rrpp pertenece a una productora 
    Rrpp.associate = function (models) {
        Rrpp.belongsTo(models.Productoras, {
            as: "rrpp",
            foreignKey: "id_prod",
        })
    }
    return Rrpp;
}