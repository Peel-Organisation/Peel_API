const interest_list = require('./interest_list.json')
require('dotenv').config();

// import { faker } from '@faker-js/faker/locale/de';



const addInterest =  async (interest) => {
    try {
        // const AdminToken = await loginAdmin();
        const requestOptions = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({name : interest})
        };
        let link = `${process.env.API_LINK}/interest/`;
        console.log("link : ", link)
        const response = await fetch(link, requestOptions)
        // console.log("dataJson : ", response)
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
    // link = 'http://localhost:3001/api/interest';
    // axios.post(link, interest)
 
} 