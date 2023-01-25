const mysql = require("../../config/mysql");




class Question {
  static addQuestion = async (name) => {
    const sql = "INSERT INTO question (name) VALUES ?";

    const result = await mysql.query(sql, [name]).catch((err) => err.message);
    console.log(result);
    return typeof result === "string" ? result : result[0];
  };

  static getQuestionById = async (id) => {
    const sql = "SELECT * FROM question WHERE id = ?";

    const result = await mysql.query(sql, id).catch((err) => err.message);
    console.log(result);
    return typeof result === "string" ? result : result[0];
  };


  static getAllQuestion = async () => {
    const sql = "SELECT * FROM question";

    const result = await mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateQuestionById = async (name,id) => {
    const sql = "UPDATE question SET name = ? WHERE id = ?";
    var values = [name,id]

    mysql.query(sql, values, function (err, result) {
      if (err) throw err;
      return result;
    });
  };

} 
  

module.exports = Question;