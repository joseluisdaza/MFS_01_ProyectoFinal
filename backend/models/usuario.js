"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init(
    {
      Nombre: DataTypes.STRING,
      Correo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Task, {
      foreignKey: "UsuarioId",
      as: "tasks",
    });
  };

  return Usuario;
};
