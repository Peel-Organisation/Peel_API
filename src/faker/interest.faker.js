const interest_list = require('./interest_list.json')
require('dotenv').config();




const addInterest =  async (interest) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({name : interest})
        };
        let link = `${process.env.API_LINK}/interest/`;
        console.log("link : ", link)
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();

        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson;
    }
    catch (error) {
        console.log("error : ", error);
    }   
}


for (let interest of interest_list.interests){
    console.log(interest);
    addInterest(interest);
 
} 