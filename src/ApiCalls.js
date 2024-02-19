import axios from "axios"


const BASE_URL = "http://localhost:3000"
// http://localhost:3001
// https://chatapprtc-backend-production.up.railway.app
export const userRequest = axios.create({
    baseURL:BASE_URL
})


