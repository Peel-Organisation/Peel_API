
const { fakerFR } = require('@faker-js/faker');



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
            throw new Error(dataJson);
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
        return user;
    }
    catch (error) {
        throw error;
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
            throw new Error(dataJson);
        }
        let movie = dataJson.results[Math.floor(Math.random() * dataJson.results.length)];
        if (movie != undefined && user != undefined) {
            const genres_ids = movie.genre_ids.map(genre_id => {
                const genre = genres.find(genre => genre.id === genre_id);
                return {
                    id: genre_id,
                    name: genre?.name || '',
                };
            });
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            user.movie = {
                id: movie?.id,
                title: movie?.title,
                images: {
                    "backdrop_path": imageBaseUrl + movie?.backdrop_path,
                    "poster_path": imageBaseUrl + movie?.poster_path
                },
                "genre_ids": genres_ids
            }
            return user;
        }
    }
    catch (error) {
        throw error;
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
        throw error;
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
            throw new Error(dataJson);
        }
        let interest_list = dataJson;
        return interest_list;
    }
    catch (error) {
        throw error;
    }
}

const getQuestionsList = async (user) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        let link = `${process.env.API_LINK}/question`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson);
        }
        let questions_list = dataJson;
        return questions_list;
    }
    catch (error) {
        throw error;
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
        user.interests = user_interest;
        return user;
    }
    catch (error) {
        throw error;
    }
}

const getPreferences = async (user) => {
    try {
        let interval = getRandomInterval(18, 100);
        let minAgeInteval = interval[0];
        let maxAgeInteval = interval[1];
        const searchLove = getRandomBoolean();
        const preferences = {
            age: { min: minAgeInteval, max: maxAgeInteval },
            sexual_orientation: ["hetero", "homo", "bi"][getRandomInt(3)],
            searchLove: searchLove,
            searchFriend: !searchLove
        }
        user.preferences = preferences
        return user
    } catch (error) {
        throw error;
    }
}

const getRandomInterval = (min, max) => {
    let minInterval = Math.random() * (max - min) + min;
    let maxInterval = Math.floor(Math.random() * (max - minInterval) + minInterval);
    return [minInterval, maxInterval]
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const getAge = async (date) => {
    try {
        let age = Math.abs(new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970);
        return age;
    }
    catch (error) {
        throw error;
    }
}

const getCustumBio = async (user) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = process.env.OPEN_AI_API_KEY;
    const model = 'gpt-3.5-turbo'; // Le modèle à utiliser


    const age = await getAge(user.birthday)
    prompt = "écris un court texte original pour un site de rencontre. \n Le texte doit faire un maximum de 400 caractères, tu n'es pas obligé d'inclure toutes les informations, justes celles qui sont importantes\Tu peux y inclure y une blague accrocheuse qui dois être diluée dans la conversation mais ne l'annonce pas avant. Ne met pas de hashtags dans la bio. Si tu ne comprends pas un terme ne l'inclus pas\n"
    prompt += 'je suis a la recherche de : ' + (user.preferences.searchLove ? 'l\'amour' : 'l\'amitié') + ' tu dois le prendre en compte dans la biographie\n';
    prompt += 'Voici des informations sur moi :\n'
    prompt += `Je m'appelle ${user.firstName}, j'ai ${age} ans.\n`;
    let interest = user.interests.map(interest => interest.name).join(', ');
    prompt += `Intérêts : ${interest}\n`;
    prompt += "je me considère comme : " + user.biographie



    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }], // Le texte à compléter
            max_tokens: 400,
            temperature: 0.6,
            n: 1
        })
    };





    try {
        const response = await fetch(apiUrl, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            console.log("dataJson : ", dataJson)
            throw new Error(dataJson);
        }
        const bio = dataJson.choices[0].message.content;
        user.biographie = bio;
        return user;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête à ChatGPT:', error);
        return null;
    }
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const getRandomMusic = async (user) => {
    try {
        let searchText = fakerFR.music.songName()
        const url = `${process.env.GENIUS_API_PATH}search?q=${searchText}&page=1`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
            },
        });
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson);
        }
        let music = dataJson.response.hits[0].result;
        const url2 = `${process.env.GENIUS_API_PATH}songs/${music.id}?text_format=plain&`;
        const response2 = await fetch(url2, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
            },
        });
        const data = await response2.json();
        let music2 = data.response.song
        user.music = {
            id: music2.id,
            title: music2.title,
            image: music2.song_art_image_thumbnail_url,
            artist: { id: music2.primary_artist.id, name: music2.primary_artist.name, image: music2.primary_artist.image_url },
            album: { id: music2.album.id, title: music2.album.name, image: music2.album.cover_art_url },
        };
        return user;
    }
    catch (error) {
        throw error;
    }
}

const getRandomModules = async (user) => {
    try {
        let mainModule = ["gif", "movie", "music"]
        let modules = ["gif", "movie", "music", "biographie", "interests", "questions"];
        let user_modules = [];
        user_modules.push(mainModule[Math.floor(Math.random() * mainModule.length)]);
        for (let i = 1; i < 4; i++) {
            let module = modules[Math.floor(Math.random() * modules.length)];
            if (user_modules.includes(module)) {
                i--;
            } else {
                user_modules.push(module);
            }
        }
        user.profileModules = {};
        user.profileModules.mainElement = user_modules[0];
        user.profileModules.secondaryElement = user_modules[1];
        user.profileModules.tertiaryElement = user_modules[2];
        user.profileModules.quaternaryElement = user_modules[3];
        return user;
    }
    catch (error) {
        throw error;
    }
}



const getRandomBoolean = () => {
    return Math.random() < 0.5;
}

const getRandomQuestion = async (user) => {
    try {
        const questions_list = await getQuestionsList();
        console.log("questions_list : ", questions_list)
        let user_questions = [];
        for (let i = 0; i < 3; i++) {
            let question = questions_list[Math.floor(Math.random() * questions_list.length)];
            if (user_questions.includes(question)) {
                i--;
            } else {
                const answer = fakerFR.lorem.sentence();
                user_questions.push({ question: question._id, answer: answer });

            }
        }
        user.questions = user_questions;
        console.log("user_questions : ", user_questions)
        return user;
    }
    catch (error) {
        throw error;
    }
}

const getRandomAge = (user) => {

    const age = Math.floor(Math.random() * 30) + 18;
    let date = new Date();
    date.setFullYear(date.getFullYear() - age);
    user.birthday = date;
    console.log("user.birthday : ", user.birthday)
    return user;
}

module.exports = { getRandomAge, getRandomQuestion, getRandomGif, getRandomMovie, updateInterest, getCustumBio, getRandomMusic, getRandomModules, getRandomBoolean, getPreferences }