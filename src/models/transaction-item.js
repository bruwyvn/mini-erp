import { DataTypes } from 'sequelize'
import database from '../database'

import Resource from './resource.js'
import Location from './location.js'

class TransactionItem extends Model {}

TransactionItem.init(
  {
    transactionItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  { sequelize: database }
)

Resource.hasOne(TransactionItem)

TransactionItem.belongsTo(Resource)

Transaction.hasOne(Location)

Location.belongsTo(Transaction)

export default TransactionItem
