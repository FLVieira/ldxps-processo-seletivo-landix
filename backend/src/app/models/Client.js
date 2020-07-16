import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

export default class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        CDCL: {
          primaryKey: true,
          type: Sequelize.UUID,
        },
        DSNOME: Sequelize.STRING(50),
        IDTIPO: Sequelize.CHAR(2),
        CDVEND: Sequelize.UUID,
        DSLIM: Sequelize.DECIMAL(15, 2),
      },
      {
        sequelize,
        tableName: 'clients',
      }
    );

    this.addHook('beforeSave', async (client) => {
      client.CDCL = uuid();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Seller, { foreignKey: 'CDVEND' });
  }
}
