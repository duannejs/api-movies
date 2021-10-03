import { DbAddMovies } from '../../presentation/data/usecase/add-csv';

type SutTypes = {
  sut: DbAddMovies
}

const makeSut = (): SutTypes => {
  const sut = new DbAddMovies()
  return {
    sut
  }
}

test('Test Insert Dados', async () => {
  const { sut } = makeSut()
  const isValid = await sut.add()
  expect(isValid).toBe(true)
})

