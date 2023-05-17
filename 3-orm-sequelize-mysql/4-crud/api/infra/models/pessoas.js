/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define("Pessoas", {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Pessoas.associate = function(models) {
    // associations can be defined here
  };
  return Pessoas;
};