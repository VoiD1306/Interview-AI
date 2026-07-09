import axios from "axios"


export const api = axios.create({
    baseURL: "https://interview-ai-backend-9ujm.onrender.com",
    withCredentials: true
})

// attaches token to every outgoing request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        if (response.data.token) {
            localStorage.setItem("token", response.data.token) // 👈 add
        }

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        if (response.data.token) {
            localStorage.setItem("token", response.data.token) // 👈 add
        }

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        localStorage.removeItem("token") // 👈 add

        return response.data

    } catch (err) {
        console.log(err)
    }

}