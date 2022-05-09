import { makeValidator, cleanEnv, str, port } from 'envalid'

const token = makeValidator(x => {
  if (/[0-9a-f]{128}/.test(x)) return x
  else throw new Error('Expected a 128 chars token')
})

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['dev', 'prod', 'staging', 'test']
    }),
    PORT: port(),
    DB_DIALECT: str({
      choices: [
        'mysql',
        'mariadb',
        'postgres',
        'mssql',
        'sqlite',
        'db2',
        'snowflake'
      ]
    }),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    ACCESS_TOKEN_SECRET: token(),
    REFRESH_TOKEN_SECRET: token()
  })
}

export default validateEnv
