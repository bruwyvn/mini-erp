import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  { sequelize: store, paranoid: true }
)

export default Transaction
