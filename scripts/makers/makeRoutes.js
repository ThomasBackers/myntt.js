const [,, ...args] = process.argv

if (args.length !== 2) console.log('makeRoutes expected exactly 2 arguments')
else {
  const name = args[0]
  const controllerName = args[1]
  const capitalizedControllerName = controllerName.replace(controllerName[0], controllerName[0].toUpperCase())

  if (/[a-z]+/.test(name)) {
    const fs = require('fs')

    fs.writeFileSync(
      `src/api/controllers/${name}.controller.ts`,
`import { Router } from 'express'
import ${capitalizedControllerName}Controller from '@controllers/${controllerName}'.controller'

const ${name}Router = Router()

${name}Router.get(
  '/${controllerName}',
  ${capitalizedControllerName}Controller.index
)

${name}Router.post(
  '/${controllerName}',
  ${capitalizedControllerName}Controller.store
)

${name}Router.get(
  '/${controllerName}/:id',
  ${capitalizedControllerName}Controller.show
)

${name}Router.put(
  '/${controllerName}/:id',
  ${capitalizedControllerName}Controller.update
)

${name}Router.delete(
  '/${controllerName}/:id',
  ${capitalizedControllerName}Controller.destroy
)

export default ${name}Router
`
    )
  }
}
