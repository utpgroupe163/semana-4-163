'use strict';

// const Categoria = require('../models/categoria')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' })
      // Articulo.belongsToMany(Categoria, {through: 'articulo_por_categoria'})
    }
  };
  Articulo.init({
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Articulo',
  });
  return Articulo;
};