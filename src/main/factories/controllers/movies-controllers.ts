import { Controller, HttpResponse } from "../../adapters"
import { ok, badRequest, serverError } from '../../helper/http-helper'
import { DbAddMovies } from '../../../presentation/data/usecase/add-csv';


export class MovieUpController implements Controller {
    constructor(
    ) { }
    async handle(): Promise<HttpResponse> {
        try {
            const sut = new DbAddMovies();
            const result = await sut.select()
            if (result) {
                return ok(result)
            } else {
                return badRequest('Requisição Inválida')
            }
        } catch (ex) {
            console.log(ex)
            return serverError('InternalServerError Nao foi possivel processar a requisicao ' + ' errorDescription: ' + ex)
        }

    }

}
export namespace MovieUpController {
    export type Request = {
        year: number,
        title: string,
        studios: string,
        producer: string,
        winner: boolean,
    }
}
