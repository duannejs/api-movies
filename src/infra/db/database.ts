var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
import tableMovie from '../../domain/models/Movies'

export default class sqlite {
  static addValues(year: number, title: string, studios: string, producer: string, winner: boolean): boolean {
    let result
    db.serialize(function (err: any) {
      var stmt = db.prepare('INSERT INTO movies VALUES (?,?,?,?,?)');
      stmt.run(year, title, studios, producer, winner);
      if (err) {
        result = false
      }
      else {
        result = true
      }
      stmt.finalize();
    });
    return result
  }

  static createTable() {
    db.serialize(function () {
      const table = new tableMovie()
      const sql = table.addTable();
      db.run(sql);
    });
  }

  static async delete(producer: string): Promise<boolean> {
    return new Promise((res, rej) => {
      db.run(`DELETE FROM MOVIES WHERE PRODUCER = "${producer}"`, [], function (err: any, rows: any) {
        if (err) {
          res(false);
        } else {
          res(true);
        };
      });
    })
  }

  static async update(values): Promise<boolean> {
    return new Promise((res, rej) => {
      db.run(`UPDATE MOVIES SET PRODUCER = "${values.producer}" , YEAR = "${values.year}" , TITLE = "${values.title}" , STUDIOS = "${values.studios}" , WINNER = "${values.winner}"` + ` WHERE TITLE = "${values.title}"`, [], function (err: any, rows: any) {
        if (err) {
          res(false);
        } else {
          res(true);
        };
      });
    })
  }


  static async selectValues(): Promise<string> {
    return new Promise((res, rej) => {
      db.serialize(function () {
        db.all('select producer, year from movies where winner = true ', [], function (err: any, rows: any) {
          if (err) {
            rej(err);
          }
          res(rows);
        });
      });

    })

  }
  constructor() {
  }
}


