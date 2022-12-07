const mysql = require("../config/mysql");
const recherche = require('./recherche');
const profile = require('./profile');
const localisation = require('./localisation')
const Math = require("mathjs")







class Match {

  static findMatchList = async (user_id) => {
    //------------------récupérer les préférences de l'utilisateur
    var user_search = await recherche.getRechercheById(user_id);
    user_search = user_search[0];


    var user_profile = await profile.getProfileById(user_id);
    user_profile = user_profile[0];

    // console.log(user_profile)
    //-----------------tri par sexe
    
    var sexe_target = ""
    if (user_search.preference_gender === "bi"){
        sexe_target = ['male','female']
    } else { 
        sexe_target = [user_search.preference_gender]
    }

    //---------------tri par préférence sexuelle de la target
    var user_sexe = user_profile.gender

    //----------------tri par age-----------

    let now = new Date()

    var user_age = 0
      if (user_profile.birthday != null) {
    
        var month_diff = (now.getTime() - user_profile.birthday.getTime())
        //convert the calculated difference in date format  
        var age_dt = new Date(month_diff);  
        //extract year from date      
        var year = age_dt.getUTCFullYear();  
        //now calculate the age of the user  
        user_age = Math.abs(year - 1970);   
      }
    

    //--------------------target preferences age de la target
    var target_age_min = user_search.age_min
    var target_age_max = user_search.age_max



        

    // const sql = "SELECT profile.user_id, localisation.lattitude, localisation.longitude, recherche.zone_recherche, profile.bio, profile.firstname, profile.birthday FROM profile INNER JOIN localisation ON localisation.user_id = profile.user_id INNER JOIN recherche  ON profile.user_id = recherche.user_id LEFT JOIN liked ON liked.user_id = profile.user_id WHERE (liked.target_id IS NULL OR liked.user_id != '?') AND profile.gender IN (?)  AND recherche.preference_gender IN (?, 'bi')  AND DATE_SUB( NOW(), INTERVAL ? YEAR  ) > profile.birthday   AND DATE_SUB( NOW(), INTERVAL ? YEAR  ) < profile.birthday  AND recherche.age_min < ?  AND recherche.age_max > ?; ";
    // const result = await mysql.query(sql, [user_id, sexe_target, user_sexe, target_age_min, target_age_max, user_age, user_age]).catch((err) => err.message);


    // const sql2 = "SELECT profile.user_id FROM liked INNER JOIN profile ON profile.user_id = liked.target_id WHERE (liked.user_id = ?) ;"
    // const liked = await mysql.query(sql2,user_id).catch((err) => err.message);

    // var tab_localisation = typeof result === "string" ? result : result[0];

    // //-------------------------tri par localisation----------------------
    // var user_localisation = await localisation.getLocalisationById(user_id);
    // user_localisation = user_localisation[0];

    // var user_long = user_localisation.longitude
    // var user_latt = user_localisation.lattitude
    // var user_zone = user_search.zone_recherche
    
    // var tab_result = []



    // for (var i = 0; i < tab_localisation.length; i++) {      
    //   if (tab_localisation[i].user_id != user_id){
    //     var distance = Math.acos(Math.sin((Math.pi / 180) * user_latt) * Math.sin((Math.pi / 180) * tab_localisation[i].lattitude) + Math.cos((Math.pi / 180) * user_latt) * Math.cos((Math.pi / 180) * tab_localisation[i].lattitude) * Math.cos((Math.pi / 180) * tab_localisation[i].longitude - (Math.pi / 180) * user_long)) * 6371;
    //     if (distance < user_zone && distance < tab_localisation[i].zone_recherche){
          // if (tab_liked.find(nb => nb === tab_localisation[i].user_id) == undefined  ){
          //   var interet_tab = await getInteretById(tab_localisation[i].user_id)
          //   var question_tab = await getQuestionById(tab_localisation[i].user_id)
          //   tab_result.push({user_id : tab_localisation[i].user_id, lattitude : tab_localisation[i].lattitude, longtitude : tab_localisation[i].longitude, bio : tab_localisation[i].bio, firstname : tab_localisation[i].firstname, birthday : tab_localisation[i].birthday, interet : interet_tab, question : question_tab});
          // } 
        // }
    //   }
    // }


    // //-----------------------------classement par préférence------------

    // return tab_result;


    const sql = "SELECT profile.user_id, profile.bio, profile.firstname, profile.birthday FROM profile;";
    const result = await mysql.query(sql,user_id).catch((err) => err.message);

    var tab_localisation = typeof result === "string" ? result : result[0];
    // console.log(tab_localisation)

    const sql2 = "SELECT profile.user_id FROM liked INNER JOIN profile ON profile.user_id = liked.target_id WHERE (liked.user_id = ?) ;"
    const liked = await mysql.query(sql2,user_id).catch((err) => err.message);

    var tab_liked = typeof liked === "string" ? liked : liked[0];

    for (let index = 0; index < tab_liked.length; index++) {
      tab_liked[index] = tab_liked[index].user_id;
      
    }



    
    var tab_result = []

    
    

    for (var i = 0; i < tab_localisation.length; i++) {  
      if (tab_localisation[i].user_id != user_id){
        if (tab_liked.find(nb => nb === tab_localisation[i].user_id) == undefined  ){
          
          var interet_tab = await getInteretById(tab_localisation[i].user_id)
          var question_tab = await getQuestionById(tab_localisation[i].user_id)
          console.log(interet_tab)
          if(interet_tab.length == 5 && question_tab.length == 3){
            tab_result.push({user_id : tab_localisation[i].user_id, lattitude : tab_localisation[i].lattitude, longtitude : tab_localisation[i].longitude, bio : tab_localisation[i].bio, firstname : tab_localisation[i].firstname, birthday : tab_localisation[i].birthday, interet : interet_tab, question : question_tab});
          }
        }
      }
    }

    console.log(tab_result)

    return tab_result;

    
  };

  


  static addLike = async (user_id, target_id, type) => {
    const sql = "INSERT INTO liked (user_id, target_id, type) VALUES (?,?,?)";
 
    const result = await mysql.query(sql, [user_id, target_id, type]).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  }

  static testMatch = async (user_id, target_id) => {
    const sql = "SELECT user_id FROM liked WHERE liked.target_id = ? AND liked.user_id = ? AND liked.type = 'like'";
 
    const result = await mysql.query(sql, [user_id, target_id]).catch((err) => err.message);
    var res = typeof result === "string" ? result : result[0];
    if (res [0] != null){
      return res[0].user_id
    } else {
      return false
    }
  }



  static getLikesById = async (user_id) => {
    const sql = "  SELECT target_id FROM liked WHERE user_id = ?";

    const result = await mysql.query(sql, user_id).catch((err) => err.message);
    return typeof result === "string" ? result : result[0];
  };

  


}

async function getInteretById(user_id){
  const sql = " SELECT interet.name FROM interet_relation INNER JOIN interet ON interet_relation.interet_id = interet.id WHERE user_id = '1'";

  const result = await mysql.query(sql, user_id).catch((err) => err.message);
  // console.log(result);
  return typeof result === "string" ? result : result[0];
}

async function getQuestionById(user_id){
  const sql = " SELECT question.name, question_relation.reponse FROM question_relation INNER JOIN question ON question_relation.question_id = question.id WHERE user_id = '1'";

  const result = await mysql.query(sql, user_id).catch((err) => err.message);
  return typeof result === "string" ? result : result[0];
};


module.exports = Match;