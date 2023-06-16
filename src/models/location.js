import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

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
  { sequelize: store, paranoid: true }
)

export default Location
