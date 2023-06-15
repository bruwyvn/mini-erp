import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

import Movement from './movement.js'
import Resource from './resource.js'
import Location from './location.js'

class MovementItem extends Model {}

MovementItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  { sequelize: database, paranoid: true }
)

MovementItem.belongsTo(Movement, { as: 'movement' })
MovementItem.belongsTo(Resource, { as: 'resource' })
MovementItem.belongsTo(Location, { as: 'location' })

export default MovementItem
