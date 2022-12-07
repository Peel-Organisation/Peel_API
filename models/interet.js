const mysql = require("../config/mysql");




class Interet {
  static addInteret = async (name) => {
    const sql = "INSERT INTO interet (name) VALUES ?";

    const result = await mysql.query(sql, [name]).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static getInteretById = async (id) => {
    const sql = "SELECT * FROM interet WHERE id = '?'";

    mysql.query(sql, id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };


  static getAllInteret = async () => {
    const sql = "SELECT * FROM interet";
    const result = await mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateInteretById = async (name,id) => {
    const sql = "UPDATE interet SET name = ? WHERE id = ?";
    var values = [name,id]

    mysql.query(sql, values, function (err, result) {
      if (err) throw err;
      return result;
    });
  };

} 
  

module.exports = Interet;