import { Request, Response, NextFunction } from 'express'
import jsonWebToken from 'jsonwebtoken'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  if (!token) return res.json({ status: 401, msg: 'access denied' })
  jsonWebToken.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (error, tokenData) => {
    if (error) return res.json({ status: 403, msg: 'invalid token' })
    req.body.token = tokenData
    next()
  })
}

export default authenticateToken
