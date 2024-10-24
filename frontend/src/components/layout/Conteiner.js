import styles from "./Conteiner.module.css"

function Conteiner({children}) {

    return (
        <main className={styles.Conteiner}>
            {children}
        </main>
    )
}

export default Conteiner