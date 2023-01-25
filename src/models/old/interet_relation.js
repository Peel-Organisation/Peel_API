const mysql = require("../../config/mysql");




class Interet_Relation {
  static addInteret_Relation = async (user_id, nb_interet) => {
    var result
    for(var i = 1; i <= nb_interet; i++){
      const sql = "INSERT INTO interet_relation (user_id,nb) VALUES (?,?)";

      result = await mysql.query(sql, [user_id,i]).catch((err) => err.message);
    }
    return result;
  };

  static getInteret_RelationById = async (user_id) => {
    const sql = "SELECT * FROM interet_relation WHERE user_id = ?";

    const result = await mysql.query(sql, user_id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };


  static getAllInteret_Relation = async () => {
    const sql = "SELECT * FROM interet_relation";

    const result = mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateInteret_RelationById = async (user_id, interet_tab) => {
    for (var i = 0; i < interet_tab.length; i++) {
      const sql = "UPDATE interet_relation SET interet_id = ? WHERE user_id = ? AND nb = ?";
      var values = [interet_tab[i],user_id, i+1]

      const result = mysql.query(sql,values).catch((err) => err.message);
      return typeof result === "string" ? result : result[0];
    }
    return result;
  };

} 
  

module.exports = Interet_Relation;