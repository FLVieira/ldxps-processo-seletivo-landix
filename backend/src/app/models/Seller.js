import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

export default class Seller extends Model {
  static init(sequelize) {
    super.init(
      {
        CDVEND: {
          primaryKey: true,
          type: Sequelize.UUID,
        },
        DSNOME: Sequelize.STRING(50),
        CDTAB: Sequelize.INTEGER,
        DTNASC: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'sellers',
      }
    );

    this.addHook('beforeSave', async (seller) => {
      seller.CDVEND = uuid();
    });

    return this;
  }
}
