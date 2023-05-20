'use strict';
const uuid = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes', [{
      id: uuid.v4(),
      nome: 'GERENTE',
      descricao: "Função de gerente",
      createdAt: new Date(),
			updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissoes', null, {});
  }
};
