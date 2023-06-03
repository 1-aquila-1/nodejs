'use strict';
const uuid = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes', [{
      id: "p-editar",
      nome: 'editar',
      descricao: "Pode editar produtos",
      createdAt: new Date(),
			updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissoes', null, {});
  }
};
