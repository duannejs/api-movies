import  server  from '../../main/server'
import { DbAddMovies } from '../../presentation/data/usecase/add-csv';


function startRead() {
  server
  const movies = new DbAddMovies()
  movies.add();

}

async function start() {
  await startRead();
}

start();