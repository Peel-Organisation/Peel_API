const mysql = require("../../config/mysql");




class Question_Relation {
  static addQuestion_Relation = async (user_id, nb_question) => {

    var result
    for(var i = 1; i <= nb_question; i++){
      const sql = "INSERT INTO question_relation (user_id,nb) VALUES (?,?)";

      result = await mysql.query(sql, [user_id,i]).catch((err) => err.message);
      // console.log(result);
    }
    return result;
  };

  static getQuestion_RelationById = async (user_id) => {
    const sql = "SELECT * FROM question_relation WHERE user_id = ?";

    const result = await mysql.query(sql, user_id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };


  static getAllQuestion_Relation = async () => {
    const sql = "SELECT * FROM question_relation";

    const result = await mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateQuestion_RelationById = async (user_id,question_id, reponse) => {
    var result
    for (var i = 0; i < question_id.length; i++) {
      const sql = "UPDATE question_relation SET question_id = ?, reponse = ? WHERE user_id = ? AND nb = ?";
      var values = [question_id[i],reponse[i] ,user_id, i+1]

      mysql.query(sql, values, function (err, result) {
        if (err) throw err; 
        console.log(result)
      });
    }
    return result;
  };

} 
  

module.exports = Question_Relation;