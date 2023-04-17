const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
const axios = require('axios');

const token = process.env.GIPHY_API_KEY

const getUserList = async () => {
    try {
        const requestOptions = {  
            headers: { 'Content-Type': 'application/json', "authorization": token },
            method: 'GET'
        };
        let link = `${process.env.API_LINK}/user/all`;
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

const getRandomGif = async () => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        let link = `${process.env.GIPHY_PATH}/random?api_key=${process.env.GIPHY_API_KEY}`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson.data;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const updateUser = async (user) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', "authorization": token },
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
        console.log("error : ", error);
    }   
}

getUserList().then((userList) => {
    if (userList?.length > 0) {
        for (let user of userList) {
            if (user.gif === undefined) {
                getRandomGif().then((gif) => {
                    user.gif = {
                        id: gif.id,
                        url: gif.url,
                        title: gif.title,
                        image: {
                            "height": gif?.images?.original?.height,
                            "width": gif?.images?.original?.width,
                            "url": gif?.images?.original?.url,
                            "webp": gif?.images?.original?.webp,
                            "frames": gif?.images?.original?.frames,
                            "hash": gif?.images?.original?.hash
                        }
                    }
                    updateUser(user).then((updatedUser) => {
                        console.log("updatedUser : ", updatedUser)
                    })
                })
            }
        }
    }
})