import { Sequelize, Dialect } from 'sequelize'

class DatabaseManager {
  private dialect: Dialect
  private databaseName: string
  private sequelize: Sequelize

  constructor () {
    this.dialect = String(process.env.DB_DIALECT) as Dialect
    this.databaseName = String(process.env.DB_NAME)
    this.sequelize = new Sequelize(
      this.databaseName,
      String(process.env.DB_USER),
      String(process.env.DB_PASSWORD),
      {
        dialect: this.dialect,
        storage: this.dialect === 'sqlite'
          ? `./${this.databaseName}.sqlite`
          : '',
        host: String(process.env.DB_HOST),
        logging: (...message): void => console.log(`🦊: ${message}`)
      }
    )
  }

  public get ORM (): Sequelize {
    return this.sequelize
  }

  public sync = async (): Promise<boolean> => {
    let isSuccessful = true
    try {
      await this.sequelize.sync()
    } catch (error: unknown) {
      console.log(`🐺: ${error instanceof Error ? error.message : error}`)
      isSuccessful = false
    }
    console.log('🦊: successfully synced to database')
    return isSuccessful
  }
}

const databaseManager = new DatabaseManager()

export default databaseManager
