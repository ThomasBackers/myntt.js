import { DataTypes, Model } from 'sequelize'
import Token from '@core/interfaces/token.interface'
import databaseManager from '@core/database/manager.database'

class TokenModel extends Model<Token> {}

TokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: databaseManager.ORM,
    tableName: 'tokens'
  }
)

export default TokenModel
