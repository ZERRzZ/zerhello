const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'czs19990509=',
  database: 'onepiece'
});

connection.connect()

function indexData(callback) {
  connection.query('SELECT * FROM captain', (error, results) => {
    if (error) throw error
    callback(results)
  })
}

function personalData(id, callback) {
  connection.query(`SELECT * FROM captain where id=${id}`, (error, results) => {
    if (error) throw error
    callback(results[0])
  })
}

function changedData(id, obj, callback) {
  let sql =
    `update captain set name="${obj.name}",power="${obj.power}",team="${obj.team}" where id=${id}`
  connection.query(sql, (error, results) => {
    if (error) throw error
    callback(results)
  })
}

function addData(datas, callback) {
  let sql =
    `insert into captain(name,power,team) values('${datas.name}','${datas.power}','${datas.team}')`

  connection.query(sql, (error, results) => {
    if (error) throw error
    callback(results)
  })
}

function deleteData(id, callback) {
  let sql = `delete from captain where id=${id}`
  connection.query(sql, (error, results) => {
    if (error) throw error
    callback(results)
  })
}

module.exports = {
  indexData,
  personalData,
  changedData,
  addData,
  deleteData
}
