var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
import tableMovie from '../../domain/models/Movies'

export default class sqlite {
  static addValues(ano: number, title: string, studios: string, producer: string, winner: boolean): boolean {
    let result
    db.serialize(function (err: any) {
      var stmt = db.prepare('INSERT INTO movies VALUES (?,?,?,?,?)');
      stmt.run(ano, title, studios, producer, winner);
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

  static async delete(values): Promise<boolean> {
    return new Promise((res, rej) => {
      db.run(`DELETE FROM MOVIES WHERE rowid = "${values.id}"`, [], function (err: any, rows: any) {
        if (err) {
          rej(false);
        } else {
          res(true);
        };
      });
    })
  }

  static async update(values): Promise<boolean> {
    return new Promise((res, rej) => {
      db.run(`UPDATE MOVIES SET PRODUCER = "${values.producer}" , ano = "${values.year}" , TITLE = "${values.title}" , STUDIOS = "${values.studios}" , WINNER = "${values.winner}"` + ` WHERE rowid = "${values.id}"`, [], function (err: any, rows: any) {
        if (err) {
          res(false);
        } else {
          res(true);
        };
      });
    })
  }

  static async path(values): Promise<boolean> {
    return new Promise((res, rej) => {
      db.run(`UPDATE MOVIES SET producer = "${values.producer}" ` + ` WHERE rowid = "${values.id}"`, [], function (err: any, rows: any) {
        if (err) {
          rej(false);
        } else {
          res(true);
        };
      });
    })
  }


  static async selectValues(): Promise<any> {
    return new Promise((res, rej) => {
      db.serialize(function () {
        db.all('select producer, min(ano) as previouswin, max(ano) as followingwin ,  max(ANO) - MIN(ANO) as interval from movies where winner = true group by producer HAVING COUNT(*) >= 2 limit 1', [], function (err: any, rows: any) {
          if (err) {
            rej(err);
          }
          res(rows);
        });
      });

    })

  }
  static async selectMaxValues(): Promise<any> {
    return new Promise((res, rej) => {
      db.serialize(function () {
        db.all('select producer, min(ano) as previouswin, max(ano) as followingwin ,  max(ANO) - MIN(ANO) as interval from movies where winner = true group by producer HAVING COUNT(*) >= 2 order by producer desc limit 1', [], function (err: any, rows: any) {
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


