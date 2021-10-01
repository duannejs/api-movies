import { Controller } from "../../adapters/controller"
import { MovieUpController, MovieDeleteController, MovieUpPostController, MovieUpPutController, MovieUpPathController } from "./"


export const MovieController = (): Controller => {
  const controller = new MovieUpController()
  return controller

}

export const MovieDelete = (): Controller => {
  const controller = new MovieDeleteController()
  return controller

}

export const MoviePostController = (): Controller => {
  const controller = new MovieUpPostController()
  return controller

}

export const MoviePutController = (): Controller => {
  const controller = new MovieUpPutController()
  return controller

}

export const MoviePathController = (): Controller => {
  const controller = new MovieUpPathController()
  return controller

}