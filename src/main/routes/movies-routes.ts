import { adaptRoute } from '../adapters/express-route-adapter'

import { Router } from 'express'

export default (router: Router): void => {
  //router.get('/version', adaptRoute(VersionController()))
  //router.post('/users', adaptRoute(UserController()))
  //router.delete('/users', adaptRoute(UserControllerDelete()))
}
