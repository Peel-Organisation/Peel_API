const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
const axios = require('axios');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Q5NDRhNzMwYjQ4OWExZWZjMDBkYSIsImlhdCI6MTY3NDQ4NDgwNn0.yUTDumUU346yPxMGwED6GILD3dyuxuEE0_yA7-JpOnM"

const getUserList = async () => {
    try {
        const requestOptions = {  
            headers: { 'Content-Type': 'application/json', "authorization": token },
            method: 'GET'
        };
        let link = 'http://localhost:3001/api/user/all';
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
        let link = 'https://api.giphy.com/v1/gifs/random?api_key=dWUao2LMG0bqBu1qHB1g2Dn1MS6Prwev';
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
        let link = `http://localhost:3001/api/user/useradmin/${user._id}`;
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
    // console.log("userList : ", userList)
    if (userList?.length > 0) {
        for (let user of userList) {
            if (user.gif === undefined) {
                getRandomGif().then((gif) => {
                    // console.log("gif : ", gif)
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
                    console.log("user : ", user.gif)
                    updateUser(user).then((updatedUser) => {
                        console.log("updatedUser : ", updatedUser)
                    })
                })
            }
        }
    }
})