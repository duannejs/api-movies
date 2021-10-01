import { HttpResponse } from '../adapters'


export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const AuthenticationError = (error: any): HttpResponse => ({
  statusCode: 401,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})


export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (data: any): HttpResponse => ({
  statusCode: 500,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
