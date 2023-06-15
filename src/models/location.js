import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { sequelize: database, paranoid: true }
)

export default Location
