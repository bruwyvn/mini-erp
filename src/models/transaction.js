import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

import TransactionItem from './transaction-item.js'
import Location from './location.js'

class Transaction extends Model {}

Transaction.init(
  {
    transactionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  { sequelize: database }
)

Transaction.hasMany(TransactionItem)

TransactionItem.belongsTo(Transaction)

Transaction.hasOne(Location, {
  foreignKey: {
    name: 'origin',
    allowNull: true
  }
})

Transaction.hasOne(Location, {
  foreignKey: {
    name: 'destination',
    allowNull: true
  }
})

Location.belongsTo(Transaction)

export default Transaction
