import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({children}) {
    const {authenticated, adm, register, login, logout} = useAuth()

    return <Context.Provider value={{authenticated, adm, register, login, logout}} >{children}</Context.Provider>
}

export { Context, UserProvider }