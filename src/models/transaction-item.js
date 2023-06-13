import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

import Transaction from './transaction.js'
import Resource from './resource.js'

class TransactionItem extends Model {}

TransactionItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  { sequelize: database }
)

TransactionItem.belongsTo(Transaction, { as: 'transaction' });
TransactionItem.belongsTo(Resource, { as: 'resource' });

export default TransactionItem
