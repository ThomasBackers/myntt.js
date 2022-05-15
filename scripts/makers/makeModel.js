const [,, ...args] = process.argv

if (args.length !== 2) console.log('makeModel expected exactly 2 arguments')
else {
  const name = args[0]
  const capitalizedName = name.replace(name[0], name[0].toUpperCase())
  const tableName = args[1]

  if (/[a-z]+/.test(name) && /[a-z]+/.test(tableName)) {
    const fs = require('fs')

    fs.writeFileSync(
      `src/api/core/interfaces/${name}.interface.ts`,
`interface ${capitalizedName} {
  id: string
}

export default ${capitalizedName}
`
    )

    fs.writeFileSync(
      `src/api/models/${name}.model.ts`,
`import { DataTypes, Model } from 'sequelize'
import ${capitalizedName} from '@core/interfaces/${name}.interface'
import databaseManager from '@core/database/manager.database'

class ${capitalizedName}Model extends Model<${capitalizedName}> {}

${capitalizedName}Model.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: databaseManager.ORM,
    tableName: '${tableName}'
  }
)

export default ${capitalizedName}Model
`
    )
  } else console.log('invalid argument(s)')
}
