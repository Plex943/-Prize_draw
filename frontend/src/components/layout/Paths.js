import styles from "./Paths.module.css"
import { Context } from "../../context/UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

function Paths() {
    const { authenticated, adm } = useContext(Context)

    return(
        <ul className={styles.paths_conteiner}>
            {authenticated 
            ? (
                <>
                    {adm 
                    ? (
                        <li><Link to="/event/add" >Add Sorteio</Link></li>
                    ) 
                    : (
                        <li>seu pai é gay</li>
                    )}
                </>
            ) 
            : (
                <h3>entre para ter acessos a mais funções</h3>
            )}
        </ul>
    )
}

export default Paths