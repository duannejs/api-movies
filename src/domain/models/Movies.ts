
export interface MoviesAttributes {
    year: number,
    title: string,
    studios: string,
    producer: string,
    winner: boolean,


}

export default class tableMovie {
    constructor() { }

    addTable(): string {
        return 'CREATE TABLE movies (year NUMBER , title TEXT , studios TEXT , producer TEXT , winner BOOLEAN)'
    }

}