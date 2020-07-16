module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sellers', {
      CDVEND: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      DSNOME: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      CDTAB: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DTNASC: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('sellers');
  },
};
