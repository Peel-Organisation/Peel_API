const { getInterest } = require("../controllers/interest.controller");
const {execSync} = require('child_process');
const interest = require("../models/interest");



const getRandomGif = async (user) => {
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
        let gif = dataJson.data;
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
        // console.log("user : ", user.gif)
        return user;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const getRandomMovie = async (user) => {
    try {
        const genres = await fetchGenres();
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        let page = Math.floor(Math.random() * 500) + 1;
        let link = `${process.env.TMDB_PATH}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=${page}`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        let movie = dataJson.results[Math.floor(Math.random() * dataJson.results.length)];  
        if (movie != undefined && user != undefined) {
            const genres_ids = movie.genre_ids.map(genre_id => {
                const genre = genres.find(genre => genre.id === genre_id);
                return {
                id: genre_id,
                name: genre?.name|| '',
                };
            });
            user.movie = {
                id: movie?.id,
                title: movie?.title,
                image: {
                    "backdrop_path": movie?.backdrop_path,
                    "poster_path": movie?.poster_path
                },
                "genre_ids": genres_ids
            }
            // console.log("user : ", user.movie)
            return user;
        }
    }
    catch (error) {
        console.log("error : ", error);
    }   
}

const fetchGenres = async (genres) => {
    try {
        const url = `${process.env.TMDB_PATH}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`;
        const reponse = await fetch(url);
        const data = await reponse.json();
        const genres = data.genres;
        return genres;
    } catch (error) {
        console.log(error);
    }
}

    

const getInterestList = async (user) => {
     try {
        const requestOptions = {  
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        let link = `${process.env.API_LINK}/interest`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        // console.log("dataJson : ", dataJson)
        let interest_list = dataJson;
        return interest_list;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const updateInterest = async (user) => {
    try {
        const interest_list = await getInterestList();
        let user_interest = [];
        for (let i = 0; i < 5; i++) {
            let interest = interest_list[Math.floor(Math.random() * interest_list.length)];
            if (user_interest.includes(interest)) {
                i--;
            } else {
                user_interest.push(interest);
            }
        }
        user.interest = user_interest;
        // console.log("user : ", user.interest)
        return user;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const getAge = async (date) => {
    try {
        let age = Math.abs(new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970);
        return age;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const getCustumBio = async (user) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = process.env.GPT_API_KEY;
    const model = 'gpt-3.5-turbo'; // Le modèle à utiliser


    const age = await getAge(user.birthday)
    prompt = "écris une biographie originale d'un site de rencontre. Voici des informations sur moi : \n" + `Je m'appelle ${user.firstName}, j'ai ${age} ans.\n`;
    let interest = user.interest.map(interest => interest.name).join(', ');
    prompt += `Intérêts : ${interest}\n`;
    prompt += `Film préféré : ${user.movie.title}\n`;
    // prompt += `Musique préférée : ${user.music.title}\n`;

    console.log("prompt : ", prompt)


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            max_tokens: 50,
            temperature: 0.6,
            n: 1
        })
    };

    // console.log("requestOptions : ", requestOptions)
    



    try {
        const response = await fetch(apiUrl, requestOptions)
        console.log("response : ", response)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        console.log("dataJson : ", dataJson)
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête à ChatGPT:', error);
        return null;
    }
}


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 


module.exports = { getRandomGif, getRandomMovie, updateInterest, getCustumBio }