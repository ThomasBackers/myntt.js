import express, { Application, Router } from 'express'
import databaseManager from '@core/database/manager.database'

class Api {
  private app: Application
  private port: number
  private modules: { module: { (...params: any): any }, params: any[] }[]
  private routes: Router[]

  constructor () {
    this.app = express()
    this.port = Number(process.env.PORT)
    this.modules = [
      { module: express.json, params: [] }
    ]
    this.routes = []
  }

  private syncDatabase = async (): Promise<boolean> => {
    return await databaseManager.sync()
  }

  private initModules (): void {
    this.modules.forEach(moduleObject => {
      this.app.use(moduleObject.module(...moduleObject.params))
    })
  }

  private initRoutes (): void {
    this.routes.forEach(router => {
      this.app.use('api/', router)
    })
  }

  private init = async (): Promise<boolean> => {
    let isSuccessful: boolean
    const isSynced = await this.syncDatabase()
    if (isSynced) {
      try {
        this.initModules()
        this.initRoutes()
        isSuccessful = true
      } catch (error: unknown) {
        console.log(`🐺: ${error instanceof Error ? error.message : error}`)
        isSuccessful = false
      }
    } else isSuccessful = false
    return isSuccessful
  }

  public start = async (): Promise<void> => {
    const isInit = await this.init()
    if (isInit) {
      this.app.listen(this.port, (): void => {
        console.log(`🦊: API is listening on port ${this.port}`)
      })
    } else process.exit(1)
  }
}

const api = new Api()

export default api
