const { fakerFR } = require('@faker-js/faker');
require('dotenv').config();
const { getRandomAge, getRandomGif, getRandomMovie, updateInterest, getCustumBio, getRandomMusic, getRandomModules, getPreferences, getRandomQuestion } = require('./utils.js');

const faker = fakerFR



const loginAdmin = async () => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })
        };
        let link = `${process.env.API_LINK}/auth/login`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson.token;
    }
    catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    try {
        const AdminToken = await loginAdmin();
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', "authorization": AdminToken },
            method: 'GET'
        };
        console.log("AdminToken : ", AdminToken)
        let link = `${process.env.API_LINK}/user/useradmin`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson;
    }
    catch (error) {
        console.log(error);
    }
}

const updateUser = async (user) => {
    try {
        const AdminToken = await loginAdmin();
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', "authorization": AdminToken },
            method: 'PUT',
            body: JSON.stringify(user)
        };
        let link = `${process.env.API_LINK}/user/useradmin/${user._id}`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson;
    }
    catch (error) {
        console.log(error);
    }
}







const updateUserList = async () => {
    const userList = await getUserList()
    if (userList?.length > 0) {
        for (let user of userList) {
            if (!user) {
                continue;
            }
            if (!user.isFake) {
                console.log("user not fake")
                continue;
            }
            console.log("user : ", user._id)
            await delay(10000);
            try {
                // user = await getRandomQuestion(user)
                user = await getRandomAge(user)
                // user = await getRandomGif(user)
                // user = await getRandomMovie(user)
                user = await updateInterest(user)
                user = await getRandomModules(user)
                // user = await getRandomMusic(user)
                // user = await getPreferences(user)
                // user = await getCustumBio(user)
                user = await updateUser(user)
                console.log("user updated : ", user)

            } catch (error) {
                console.log(error)
            }


        }
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

updateUserList()
