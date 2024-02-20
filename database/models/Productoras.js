module.exports = function (sequelize, dataTypes) {
    let alias = "Productoras";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.INTEGER,
            unique: true
        },
        contrasena: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
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
        tableName: "productoras", timestamps: true, underscore: true
    }

    let Productoras = sequelize.define(alias, cols, config);
    //relaciones
    // una productora tiene muchos eventos
    Productoras.associate = function (models) {
        Productoras.hasMany(models.Eventos, {
            as: "productoras",
        })
    }
    return Productoras;
}