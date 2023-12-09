const { fakerFR } = require('@faker-js/faker');
require('dotenv').config();
const { getRandomGif, getRandomMovie, updateInterest, getCustumBio, getRandomMusic, getRandomModules, getPreferences } = require('./utils.js');

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
            getRandomGif(user).then((user) => {
                getRandomMovie(user).then((user) => {
                    updateInterest(user).then((user) => {
                        getRandomModules(user).then((user) => {
                            getRandomMusic(user).then((user) => {
                                getPreferences(user).then((user) => {
                                    getCustumBio(user).then((user) => {
                                        updateUser(user).then((user) => {
                                            console.log("user updated : ", user)
                                        }).catch((error) => {
                                            console.log("error while updating user : ", error);
                                        })
                                    }).catch((error) => {
                                        console.log("error while getting custom bio : ", error);
                                    })
                                }).catch((error) => {
                                    console.log("error while getting preferences : ", error);
                                })
                            }).catch((error) => {
                                console.log("error while getting random music : ", error);
                            })
                        }).catch((error) => {
                            console.log("error while getting random modules : ", error);
                        })
                    }).catch((error) => {
                        console.log("error while updating interest : ", error);
                    })
                }).catch((error) => {
                    console.log("error while getting random movie : ", error);
                })
            }).catch((error) => {
                console.log("error while getting random gif : ", error);
            })
        }
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

updateUserList()
