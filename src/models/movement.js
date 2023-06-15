import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

import Location from "./location.js"

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
  { sequelize: database, paranoid: true }
)

Movement.belongsTo(Location, { as: 'origin' });
Movement.belongsTo(Location, { as: 'destination' });

export default Movement
