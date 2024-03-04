import axios from 'axios'

export const API_URL = 'https://minebridge.site/api'

axios.defaults.withCredentials = true

export const userApi = axios.create({
    baseURL: `${API_URL}/user`
})

export const usersApi = axios.create({
    baseURL: `${API_URL}/users`
})

export const rolesApi = axios.create({
    baseURL: `${API_URL}/role`
})

export const shopApi = axios.create({
    baseURL: `${API_URL}/shop`
})