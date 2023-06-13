import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

import Location from "./location.js"

class Transaction extends Model {}

Transaction.init(
  {
    id: {
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

Transaction.belongsTo(Location, { as: 'origin' });
Transaction.belongsTo(Location, { as: 'destination' });

export default Transaction
