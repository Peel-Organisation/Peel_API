const mysql = require("../config/mysql");




class Profile {
  static addProfile = async (user_id) => {
    const sql = "INSERT INTO profile (user_id) VALUES (?)";
 
    const result = await mysql.query(sql, [user_id]).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static getProfileById = async (user_id) => {
    const sql = "SELECT * FROM profile WHERE user_id = ?";

    const result = await mysql.query(sql, user_id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static getAllProfile = async () => {
    const sql = "SELECT * FROM profile";

    const result = mysql.query(sql).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  static updateProfileById = async (user_id, firstname, lastname, gender, birthday, bio) => {
    const sql = "UPDATE profile SET firstname = ?, lastname = ?, gender = ?, birthday = ?, bio = ? WHERE user_id = ?";
    var values = [firstname, lastname, gender, birthday, bio, user_id] 

    mysql.query(sql, values, function (err, result) {
      if (err) throw err;
      return result;
    });
  };

  static updateProfileBioById = async (user_id, bio) => {
    const sql = "UPDATE profile SET bio = ? WHERE user_id = ?";
    var values = [bio, user_id] 

    mysql.query(sql, values, function (err, result) {
      if (err) throw err;
      return result;
    });
  };

} 
  

module.exports = Profile;