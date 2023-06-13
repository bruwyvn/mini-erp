import { DataTypes } from 'sequelize'
import database from '../database'

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

export default TransactionItem
