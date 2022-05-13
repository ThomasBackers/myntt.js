import { DataTypes, Model } from 'sequelize'
import User from '@core/interfaces/user.interface'
import databaseManager from '@core/database/manager.database'

class UserModel extends Model<User> {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: databaseManager.ORM,
    tableName: 'users'
  }
)

export default UserModel
