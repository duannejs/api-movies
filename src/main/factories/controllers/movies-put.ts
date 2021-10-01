import { Controller, HttpResponse } from "../../adapters"
import { ok, badRequest, serverError } from '../../helper/http-helper'
import { DbAddMovies } from '../../../presentation/data/usecase/add-csv';


export class MovieUpPutController implements Controller {
    constructor(
    ) { }
    async handle(request: MovieUpPutController.Request): Promise<HttpResponse> {
        try {
            const sut = new DbAddMovies();           
            const result = await sut.update(request)
            if (result) {
                return ok('Atualizado Filme ' + request.title)
            } else {
                return badRequest('Requisição Inválida')
            }
        } catch (ex) {
            console.log(ex)
            return serverError('InternalServerError Nao foi possivel processar a requisicao ' + ' errorDescription: ' + ex)
        }

    }

}
export namespace MovieUpPutController {
    export type Request = {
        year: number,
        title: string,
        studios: string,
        producer: string,
        winner: boolean,
    }
}


