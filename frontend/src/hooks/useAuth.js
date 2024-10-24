import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [authenticated, setAutheticated] = useState(false)
    const [adm, setAdm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        const isAdm  = localStorage.getItem("isAdm")

        if (token) {
            api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
            setAutheticated(true)
            if (isAdm) {
                setAdm(JSON.parse(isAdm))
            }
        }
    }, [])

    function authUser(token, isAdm) {
        setAutheticated(true)
        setAdm(isAdm)

        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem("isAdm", JSON.stringify(isAdm))

        navigate("/")
    }
    
    async function register(user) {
        try {
            const response = await api.post("/user/register", user)
            const data = response.data

            
            authUser(data.token, data.admin)
        } catch (err) {
            console.log(err)
        }
    }

    async function login({email, password}) {
        const userData = {email, password}
        try {
            const response = await api.post("/user/login", userData)
            const data = response.data

            
            authUser(data.token, data.admin)
        }catch(err) {
            console.log(err)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("isAdm")
            api.defaults.headers.authorization = undefined
            setAutheticated(false)
            setAdm(false)
            setTimeout(() => {
                navigate("/")
            }, 100)
        } catch (err) {
            console.log(err)
        }
    }

    return {authenticated, adm,  register, login, logout}
}
