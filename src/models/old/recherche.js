const mysql = require("../../config/mysql");




class Recherche {
  static addRecherche = async (user_id) => {
    const sql = "INSERT INTO recherche (user_id) VALUES (?)";

    const result = await mysql.query(sql, [user_id]).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static getRechercheById = async (user_id) => {
    const sql = "SELECT * FROM recherche WHERE user_id = ?;";

    const result = await mysql.query(sql, user_id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static getAllRecherche = async () => {
    const sql = "SELECT * FROM recherche";

    const result = mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateRechercheById = async (user_id, preference_gender, zone_recherche, age_min, age_max) => {
    
    const sql = "UPDATE recherche SET preference_gender = ?, zone_recherche = ?, age_min = ?, age_max = ? WHERE user_id = ?";
    var values = [preference_gender, zone_recherche, age_min, age_max, user_id] 

    const result = mysql.query(sql, values).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

} 
  

module.exports = Recherche;