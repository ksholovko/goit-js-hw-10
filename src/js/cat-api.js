import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_x8AT8B0DXvrKQTrZAhs4XUzdPoRV3uBrBDhhYxuKtXoz7ZQJHVateow5oNSF18wc";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';


export function fetchBreeds() {
    return axios.get('/breeds');
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`);
}