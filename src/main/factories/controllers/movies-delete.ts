import { Controller, HttpResponse } from "../../adapters"
import { ok, badRequest, serverError } from '../../helper/http-helper'
import { DbAddMovies } from '../../../presentation/data/usecase/add-csv';


export class MovieDeleteController implements Controller {
    constructor(
    ) { }
    async handle(request: MovieDeleteController.Request): Promise<HttpResponse> {
        try {
            const sut = new DbAddMovies();
            const result = await sut.delete(request.producer)
            if (result) {
                return ok('Deletado ' + request.producer)
            } else {
                return badRequest('Requisição Inválida')
            }
        } catch (ex) {
            console.log(ex)
            return serverError('InternalServerError Nao foi possivel processar a requisicao ' + ' errorDescription: ' + ex)
        }

    }

}
export namespace MovieDeleteController {
    export type Request = {
        year: number,
        title: string,
        studios: string,
        producer: string,
        winner: boolean,
    }
}


