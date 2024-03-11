module.exports = function (sequelize, dataTypes) {
    let alias = "EntradasAlias";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_evento: {
            type: dataTypes.INTEGER,
            foreignKey: {
                model: 'Eventos.js',
                key: 'id',
              }
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.INTEGER,
        },
        cantidad: {
            type: dataTypes.INTEGER,
        },
    }


    let config = {
        tableName: "entradas", timestamps: true, underscore: true
    }

    let Entradas = sequelize.define(alias, cols, config);
    //relaciones
    // Una entrada pertenece a un evento 
    Entradas.associate = function (models) {
        Entradas.belongsTo(models.Eventos, {
            as: "entradas",
            foreignKey: "id_eventos",
        })
    }
    return Entradas;
}