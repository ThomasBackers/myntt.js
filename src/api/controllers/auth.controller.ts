import { Request, Response } from 'express'
import UserModel from '@models/user.model'
import TokenModel from '@models/token.model'
import bcrypt from 'bcrypt'
import jsonWebToken, { VerifyErrors, JwtPayload } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const { username, email, password, passwordConfirmation } = req.body
      if (password === passwordConfirmation) {
        await UserModel.create({
          id: uuidv4(),
          username,
          email,
          hashedPassword: await bcrypt.hash(password, 10),
          avatarPath: null
        })
        return res.json({
          status: 200,
          msg: 'succeeded in creating user'
        })
      } return res.json({
        status: 500,
        msg: 'failed to create user'
      })
    } catch (error: unknown) {
      return res.json({
        status: 500,
        msg: 'failed to create user'
      })
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await UserModel.findOne({ where: { username } })
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.getDataValue('hashedPassword'))
        if (isPasswordCorrect) {
          const tokenData = { sub: user.getDataValue('id') }
          const token = jsonWebToken.sign(
            tokenData,
            String(process.env.ACCESS_TOKEN_SECRET),
            { expiresIn: '10m' }
          )
          const refreshToken = jsonWebToken.sign(tokenData, String(process.env.REFRESH_TOKEN_SECRET))
          await TokenModel.create({ id: uuidv4(), token: refreshToken })
          return res.json({
            data: {
              user: {
                username: user.getDataValue('username'),
                avatar: user.getDataValue('avatarPath')
              },
              token,
              refreshToken
            },
            status: 201,
            msg: 'succeeded in authenticating user'
          })
        } return res.json({
          status: 500,
          msg: 'failed to authenticate user'
        })
      } return res.json({
        status: 500,
        msg: 'failed to authenticate user'
      })
    } catch (error: unknown) {
      return res.json({
        status: 500,
        msg: 'failed to authenticate user'
      })
    }
  }

  static refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) return res.json({ status: 401, msg: 'access denied' })
      if (!await TokenModel.findOne({ where: { token: refreshToken } })) {
        return res.json({
          status: 403,
          msg: 'invalid token'
        })
      }
      jsonWebToken.verify(
        refreshToken,
        String(process.env.REFRESH_TOKEN_SECRET),
        (error: VerifyErrors | null, tokenData: string | JwtPayload | undefined) => {
          if (error) return res.json({ status: 403, msg: 'invalid token' })
          const token = jsonWebToken.sign(
            { sub: tokenData?.sub },
            String(process.env.ACCESS_TOKEN_SECRET),
            { expiresIn: '10m' }
          )
          res.json({
            data: { token },
            status: 201,
            response: 'succeeded in refreshing token'
          })
        }
      )
    } catch (error: unknown) {
      return res.json({
        status: 500,
        msg: 'failed to refresh token'
      })
    }
  }

  static logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      const tokenRecord = await TokenModel.findOne({ where: { token: refreshToken } })
      if (!tokenRecord) {
        return res.json({
          status: 500,
          msg: 'failed to log the user out'
        })
      }
      await tokenRecord.destroy()
      return res.json({
        status: 204,
        msg: 'succeeded in logging the user out'
      })
    } catch (error: unknown) {
      return res.json({
        status: 500,
        msg: 'failed to log the user out'
      })
    }
  }
}

export default AuthController
