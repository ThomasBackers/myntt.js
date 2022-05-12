const [,, ...args] = process.argv

if (args.length !== 1) console.log('makeMiddleware expected exactly 1 argument')
else {
  const name = args[0]

  if (/[a-zA-T]+/.test(name)) {
    const fs = require('fs')

    fs.writeFileSync(
      `src/api/middlewares/${name}.middleware.ts`,
`import { Request, Response, NextFunction } from 'express'

const ${name} = (req: Request, res: Response, next: NextFunction) => {
  next()
}

export default ${name}
`
    )
  } else console.log('invalid argument')
}
