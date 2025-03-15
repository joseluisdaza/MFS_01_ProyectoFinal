"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      Titulo: DataTypes.STRING,
      FechaLimite: DataTypes.DATE,
      Descripcion: DataTypes.STRING,
      Estado: DataTypes.STRING,
      UsuarioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.Usuario, {
      foreignKey: "UsuarioId",
      as: "usuario",
    });
  };
  return Task;
};
