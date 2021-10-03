import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'
import { MovieController, MovieDelete, MoviePathController, MoviePostController, MoviePutController } from '../factories/controllers/movies-controller-factory'

export default (router: Router): void => {
  router.get('/movies', adaptRoute((MovieController())))
  router.delete('/movies/:id', adaptRoute(MovieDelete()))
  router.post('/movies', adaptRoute(MoviePostController()))
  router.put('/movies/:id', adaptRoute(MoviePutController()))
  router.patch('/movies/:id', adaptRoute(MoviePathController()))
}
