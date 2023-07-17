import axios from "axios"

const BASE_URL = "https://chatrtc.onrender.com"

export const userRequest = axios.create({
    baseURL:BASE_URL
})

