const [,, ...args] = process.argv

if (args.length !== 2) console.log('makeController expected exactly 2 argument')
else {
  const name = args[0]
  const capitalizedName = name.replace(name[0], name[0].toUpperCase())
  const modelName = args[1]
  const capitalizedModelName = modelName.replace(modelName[0], modelName[0].toUpperCase())

  if (/[a-z]+/.test(name) && /[a-z]+/.test(modelName)) {
    const fs = require('fs')

    fs.writeFileSync(
      `src/api/controllers/${name}.controller.ts`,
`import { Request, Response } from 'express'
import ${capitalizedModelName}Model from '@models/${modelName}.model'
import { v4 as uuidv4 } from 'uuid'

class ${capitalizedName}Controller {
  static index = async (req: Request, res: Response) => {
    try {
      //
    } catch (error: Unknown) {
      //
    }
  }

  static show = async (req: Request, res: Response) => {
    try {
      //
    } catch (error: Unknown) {
      //
    }
  }

  static store = async (req: Request, res: Response) => {
    try {
      //
    } catch (error: Unknown) {
      //
    }
  }

  static update = async (req: Request, res: Response) => {
    try {
      //
    } catch (error: Unknown) {
      //
    }
  }

  static destroy = async (req: Request, res: Response) => {
    try {
      //
    } catch (error: Unknown) {
      //
    }
  }
}

export default ${capitalizedName}Controller
`
    )
  } else console.log('invalid argument(s)')
}
