import { useState, useContext } from "react"
import Input from "../../form/Input"
import {Context} from "../../../context/UserContext"
import styles from "../../form/Form.module.css"

function Login() {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (
        <section className={styles.form_conteiner}>
            <h3>
                Login
            </h3>
            <form onSubmit={onSubmit}>
                <Input
                text="Email"
                type="email"
                name="email"
                placeholder="Digite o email da Lojista..."
                handleChange={handleChange}
                />

                <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite a senha do Lojista..."
                handleChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
        </section>
    )
}

export default Login