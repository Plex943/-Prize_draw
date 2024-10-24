import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { Context } from "../../context/UserContext"

function NavBar() {
    const {authenticated, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <h2>Prize Draw - Software de Sorteio</h2>
            <ul>
                <li><Link to="/" >Home</Link></li>
                {authenticated 
                ? (
                    <li>
                        <Link onClick={logout}>Sair</Link>
                    </li>
                ) 
                : (
                    <>
                        <li>
                            <Link to="/user/register" >Registrar</Link>
                        </li>
                        <li>
                            <Link to="/user/login" >Entrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar