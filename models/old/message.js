const mysql = require("../../config/mysql");




class Message {
  static addMessage = async (user_id, target_id, message_value) => {
    if (message_value != null){
      const sql = "INSERT INTO message (user_id, target_id, message_value) VALUES (?, ?, ?)";
      // console.log(sql);
      const result = await mysql.query(sql, [user_id, target_id, message_value]).catch((err) => console.log(err));
      // console.log(result[0])
      return typeof result === "string" ? result : result[0];
    }
  };

  static getMessageListById = async (user_id, target_id) => {
    const sql = " SELECT message.user_id, profile.firstname,  message.message_value, message.message_time FROM message INNER JOIN profile ON profile.user_id = message.user_id WHERE message.user_id = ? AND message.target_id = ? UNION SELECT message.user_id, profile.firstname, message.message_value, message.message_time  FROM message   INNER JOIN profile  ON profile.user_id = message.user_id   WHERE message.user_id = ? AND message.target_id = ? ORDER BY message_time";

    const result = await mysql.query(sql, [user_id, target_id, target_id, user_id]).catch((err) => err.message);
    // console.log(result[0]);
    return typeof result === "string" ? result : result[0];
  };



} 
  

module.exports = Message;