import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [autheticated, setAutheticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            console.log("seu pai é gay")
            api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
            setAutheticated(true)
        }
    }, [])

    function authUser(token) {
        setAutheticated(true)
        localStorage.setItem("token", JSON.stringify(token))

        navigate("/")
    }

    async function register(user) {
        try {
            const response = await api.post("/user/register", user)

            const data = response.data

            authUser(data.token)
        } catch (err) {
            console.log(err)
        }
    }

    async function login({email, password}) {
        const userData = {email, password}
        try {
            const response = await api.post("/user/login", userData)
            const data = response.data

            authUser(data.token)
        }catch(err) {
            console.log(err)
        }
    }


    async function logout() {
        try {
            localStorage.removeItem("token")
            api.defaults.headers.authorization = undefined
            setAutheticated(false)
            setTimeout(() => {
                navigate("/")
            }, 100)
        } catch (err) {
            console.log(err)
        }
    }

    return {autheticated, register, login, logout}
}
