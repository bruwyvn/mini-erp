import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

class Resource extends Model {}

Resource.init(
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
    description: {
      type: DataTypes.STRING
    }
  },
  { sequelize: store }
)

export default Resource
