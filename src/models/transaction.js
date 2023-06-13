import { DataTypes, Model } from 'sequelize'
import database from '../database'

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
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  { sequelize: database }
)

export default Transaction
