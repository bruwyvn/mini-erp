import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Profile extends Model {}

Profile.init(
  {
    profileId: {
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
  { sequelize: database }
)

export default Profile
