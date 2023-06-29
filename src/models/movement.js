import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

import Location from './location.js'
import Transaction from './transaction.js'

class Movement extends Model {}

Movement.init(
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
  { sequelize: store, paranoid: true }
)

Movement.belongsTo(Location, { as: 'origin' })
Movement.belongsTo(Location, { as: 'destination' })
Transaction.belongsTo(Movement, { as: 'movement' })

export default Movement
