import { Router } from 'express'
import authenticateToken from '@middlewares/authenticateToken.middleware'
import TestController from '@controllers/test.controller'

const testRouter = Router()

testRouter.get(
  '/test',
  authenticateToken,
  TestController.test
)

export default testRouter
