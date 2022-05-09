import 'dotenv/config'
import 'module-alias/register'
import validateEnv from '@core/utils/validateEnv.util'
import api from '@api/api'

validateEnv()
api.start()
