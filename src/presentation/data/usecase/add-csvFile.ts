export interface AddCSV {
    add: () => Promise<AddCSV.Result>
}

export namespace AddCSV {
    export type Params = {
        year: number,
        title: string,
        studios: string,
        producer: string,
        winner: Boolean,
    }

    export type Result = boolean
}
