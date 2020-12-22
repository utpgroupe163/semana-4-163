'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articulos', [{
      nombre: 'Articulo_1',
      descripcion: 'lorem limsus test',
      codigo: 'lorem limsus test',
      categoriaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()

  },
  {
    nombre: 'Articulo_2',
    descripcion: 'lorem limsus test',
    codigo: 'lorem limsus test',
    categoriaId: 1,
    createdAt: new Date(),
    updatedAt: new Date()

}]);
},
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articulos', null, {});
  }
};
