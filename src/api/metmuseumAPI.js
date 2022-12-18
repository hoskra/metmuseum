import axios from 'axios'

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1'

export async function getTotal() {
    const { data } = await axios.get(`${BASE_URL}/objects`)

    return data.total
}

export async function getObject(id) {
    const { data } = await axios.get(`${BASE_URL}/objects/${id}`)

    return data
}

export async function getObjectsMatchingQuery(parameter, query) {
    let url;

    switch(parameter) {
        case "title":
            url = `${BASE_URL}/search?${parameter}=true?q=${query}`
            break;
        case "tags":
            url = `${BASE_URL}/search?${parameter}=true?q=${query}`
            break;
        case "artistOrCulture":
            url = `${BASE_URL}/search?${parameter}=true?q=${query}`
            break;
        case "geoLocation":
            url = `${BASE_URL}/search?${parameter}=${query}&q=*`
            break;
        default:
            url = `${BASE_URL}/search?q=${query}`
            break;
    }
    
    console.log(url)
    const { data } = await axios.get(url)
    console.log(data)
    return data
}

export async function getDepartments() {
    const { data } = await axios.get(`${BASE_URL}/departments`)

    return data
}
