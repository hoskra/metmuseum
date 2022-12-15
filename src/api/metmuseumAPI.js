import axios from 'axios'

export async function getTotal() {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    const { data } = await axios.get(url)
    return data.total
}

export async function getObject(id) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    const { data } = await axios.get(url)
    return data
}

export async function getObjectsMatchingQuery(parameter, query) {
    let url = "https://collectionapi.metmuseum.org/public/collection/v1/search";

    switch(parameter) {
        case "title":
            url += `?${parameter}=true?q=${query}`
            break;
        case "tags":
            url += `?${parameter}=true?q=${query}`
            break;
        case "artistOrCulture":
            url += `?${parameter}=true?q=${query}`
            break;
        case "geoLocation":
            url += `?${parameter}=${query}&q=*`
            break;
        default:
            url += `?q=${query}`
            break;
    }
    
    console.log(url)
    const { data } = await axios.get(url)
    console.log(data)
    return data
}

export async function getDepartments() {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/departments`

    const { data } = await axios.get(url)
    return data
}
