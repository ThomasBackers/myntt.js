const [,, ...args] = process.argv

if (args.length !== 2) console.log('makeController expected exactly 2 arguments')
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
      const limit = req.query?.limit as number | undefined
      const offset = req.query?.offset as number | undefined
      const order = req.body.order
      if (limit) {
        const count = await ${capitalizedModelName}Model.count()
        const lastPage = Math.ceil(count / limit)
        const record = await ${capitalizedModelName}Model.findAll({ order, limit, offset })
        return res.json({
          data: { record, lastPage },
          status: 200,
          msg: ''
        })
      } return res.json({ status: 500, msg: '' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: '' })
    }
  }

  static store = async (req: Request, res: Response) => {
    try {
      const id = uuidv4()
      await ${capitalizedModelName}Model.create({ ...req.body, id })
      return res.json({ status: 200, msg: '' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: '' })
    }
  }

  static show = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const record = await ${capitalizedModelName}Model.findOne({ where: { id } })
      return res.json({
        data: { record },
        status: 200,
        msg: ''
      })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: '' })
    }
  }

  static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const record = await ${capitalizedModelName}Model.findOne({ where: { id } })
      if (!record) return res.json({ status: 500, msg: '' })
      await record.update({ ...req.body })
      return res.json({ status: 200, msg: '' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: '' })
    }
  }

  static destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const record = await ${capitalizedModelName}Model.findOne({ where: { id } })
      if (!record) return res.json({ status: 500, msg: '' })
      await record.destroy()
      return res.json({ status: 200, msg: '' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: '' })
    }
  }
}

export default ${capitalizedName}Controller
`
    )
  } else console.log('invalid argument(s)')
}
