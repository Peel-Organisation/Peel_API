const mysql = require("../config/mysql");


class User {
  static addUser = async (email, password) => {
    const sql = "INSERT INTO user (email, password) VALUES (?, ?)";

    const result = await mysql.query(sql, [email, password]).catch((err) => console.log(err.message));
    return typeof result === "string" ? result : result[0];
  };

  static getUserById = async (id) => {
    const sql = "SELECT * FROM user WHERE id = '?'";

    con.query(sql, id).catch((err) => console.log(err.message));
    return typeof result === "string" ? result : result[0];
  };

  static getUserByEmail = async (email) => {
    const sql = "SELECT * FROM user WHERE email = ?";

    const result = await mysql.query(sql, [email]).catch((err) => console.log(err.message));
    return typeof result === "string" ? result : result[0];
  };

  static getAllUser = async () => {
    const sql = "SELECT * FROM user";

    const result = mysql.query(sql).catch((err) => console.log(err.message));
    return typeof result === "string" ? result : result[0];
  };

  static updateUserById = async (email, password,id) => {
    const sql = "UPDATE user SET email = '?', password = '?' WHERE id = '?'";
    var values = [email, password,id]

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      return result;
    });
  };

} 
  

module.exports = User;