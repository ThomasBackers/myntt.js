import { Request, Response } from 'express'
import UserModel from '../models/user.model'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jsonWebToken from 'jsonwebtoken'

class AuthController {
  static login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const user = await UserModel.findOne({ where: { username: req.body.username } })
      const accessToken = jsonWebToken.sign(user, process.env.ACCESS_TOKEN_SECRET)
      res.json({ accessToken: accessToken })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: 'failed to authenticate user' })
    }
  }

  static register = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const user = await UserModel.create({
        id: uuidv4(),
        username: req.body.username,
        email: req.body.email,
        hashedPassword: await bcrypt.hash(req.body.password, 10)
      })
      return res.json({
        record: user,
        status: 201,
        msg: 'succeeded in creating user'
      })
    } catch (error: unknown) {
      return res.json({ status: 500, msg: 'failed to create user' })
    }
  }
}

export default AuthController
