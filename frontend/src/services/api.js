import axios from "axios";

const api = axios.create({
    baseURL: 'https://text-translator2.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': '3657c5946bmsh83e3c87da69c811p1752c5jsnedb9deb1b42e',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      }
})
export default api