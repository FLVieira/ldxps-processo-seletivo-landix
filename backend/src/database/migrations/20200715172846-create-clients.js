module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      CDCL: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      DSNOME: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      IDTIPO: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        defaultValue: 'PF',
      },
      CDVEND: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'sellers', key: 'CDVEND' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      DSLIM: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('clients');
  },
};
