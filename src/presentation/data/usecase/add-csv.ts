import fs from 'fs'
import db from '../../../infra/db/database'
import { Readable } from 'stream';
import readLine from 'readline';
import { MoviesAttributes } from '../../../domain/models/Movies';

require('dotenv/config');


export class DbAddMovies extends db {
    constructor(
    ) {
        super();
    }

    async select(): Promise<String> {
        var resultlist = [];
        const result = await db.selectValues(); let res
        resultlist.push(result);
        resultlist.map(async (row) => {
            res = row
        })
        return res

    }

    async post(request): Promise<boolean> {
        const result = await db.addValues(request.year, request.title, request.studios, request.producer, request.winner)
        return result
    }

    async update(request): Promise<boolean> {
        const result = await db.update(request)
        return result
    }

    async delete(producer: string): Promise<boolean> {
        const result = await db.delete(producer)
        return result
    }

    async add(): Promise<boolean> {
        db.createTable();
        fs.readFile(process.env.CAMINHO, async (err, data) => {
            if (err) {
                console.error(err)
                return false
            }
            const readableFile = new Readable();
            readableFile.push(data)
            readableFile.push(null)

            const moviesLine = readLine.createInterface({
                input: readableFile,
            });

            const movie: MoviesAttributes[] = [];

            for await (let line of moviesLine) {
                const movieLineSplit = line.split(';');

                movie.push({
                    year: Number(movieLineSplit[0]),
                    title: movieLineSplit[1],
                    studios: movieLineSplit[2],
                    producer: movieLineSplit[3],
                    winner: Boolean(movieLineSplit[4]),
                })

            }
            for await (let { year, title, studios, producer, winner } of movie) {
                await db.addValues(year, title, studios, producer, winner)
            }

        })
        return true
    }
}


