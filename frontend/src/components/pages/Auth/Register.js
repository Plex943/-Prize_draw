import { useState, useContext } from "react";
import { Context } from "../../../context/UserContext";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css"

function Register() {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.form_conteiner}>
            <h3>
                Registrar
            </h3>
            <form onSubmit={onSubmit}>
                <Input
                text="Nome:"
                type="text"
                name="name"
                placeholder="digite o nome da conta..."
                handleChange={handleChange}
                />


                <Input
                text="Email"
                type="email"
                name="email"
                placeholder="digite o seu email..."
                handleChange={handleChange}
                />
                
                <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="digite a senha da sua conta..."
                handleChange={handleChange}
                />

                <Input
                text="Confirme a senha"
                type="password"
                name="confirmpassword"
                placeholder="digite a confirmação da senha..."
                handleChange={handleChange}
                />
                
                <Input
                text="Adm"
                type="text"
                name="adm"
                placeholder="digite o adm..."
                handleChange={handleChange}
                />

                <input type="submit" value="Registrar"/>
            </form>
        </section>
    )
}

export default Register