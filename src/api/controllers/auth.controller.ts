import { Request, Response } from 'express'
import UserModel from '@models/user.model'
import bcrypt from 'bcrypt'
import jsonWebToken from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

class AuthController {
  static login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { username, password } = req.body
      const user = await UserModel.findOne({ where: { username } })

      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.getDataValue('hashedPassword'))

        if (isPasswordCorrect) {
          const tokenData = {
            sub: user.getDataValue('id'),
            name: user.getDataValue('username'),
            iat: null
          }
          const accessToken = jsonWebToken.sign(tokenData, String(process.env.ACCESS_TOKEN_SECRET))
          return res.json({
            accessToken,
            status: 200,
            msg: 'succeeded in authenticating user'
          })
        } else return res.json({ status: 500, msg: 'failed to authenticate user' })
      } else return res.json({ status: 500, msg: 'failed to authenticate user' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: 'failed to authenticate user' })
    }
  }

  static register = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { username, email, password } = req.body
      await UserModel.create({
        id: uuidv4(),
        username,
        email,
        hashedPassword: await bcrypt.hash(password, 10)
      })
      return res.json({ status: 200, msg: 'succeeded in creating user' })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: 'failed to create user' })
    }
  }
}

export default AuthController
