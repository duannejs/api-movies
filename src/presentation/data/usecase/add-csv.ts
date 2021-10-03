import fs from 'fs'
import db from '../../../infra/db/database'
import { Readable } from 'stream';
import readLine from 'readline';
import { MoviesAttributes } from '../../../domain/models/Movies';
import { AddCSV } from './add-csvFile';
import { MovieUpPutController } from '../../../main/factories/controllers';
import { MovieUpPathController } from '../../../main/factories/controllers';
import { MovieDeleteController } from '../../../main/factories/controllers';
import { profileEnd } from 'console';

require('dotenv/config');


export class DbAddMovies extends db {
    constructor(
    ) {
        super();
    }

    async select(): Promise<String> {
        const result = await db.selectValues(); let min       
        const Maxresult = await db.selectMaxValues();

        min = {
            'min': [result],
            'max': [Maxresult]
        }
        return min

    }

    async post(request: { year: any; title: any; studios: any; producer: any; winner: any; }): Promise<boolean> {
        const result = await db.addValues(request.year, request.title, request.studios, request.producer, request.winner)
        return result
    }

    async update(request: MovieUpPutController.Request): Promise<boolean> {
        const result = await db.update(request)
        return result
    }

    async path(request: MovieUpPathController.Request): Promise<boolean> {
        const result = await db.path(request)
        return result
    }

    async delete(request: MovieDeleteController.Request): Promise<boolean> {
        const result = await db.delete(request)
        return result
    }

    async add(): Promise<AddCSV.Result> {
        db.createTable();
        var isValid = await new Promise((resolve, reject) => {
            fs.readFile(process.env.CAMINHO, async (err, data) => {
                if (err) {
                    reject(false);
                }

                const readableFile = new Readable();
                readableFile.push(data);
                readableFile.push(null);

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
                    });

                }
                for await (let { year, title, studios, producer, winner } of movie) {
                    await db.addValues(year, title, studios, producer, winner);
                }
                resolve(true)
            })
        }).then(isValid);
        return isValid
    }

}


