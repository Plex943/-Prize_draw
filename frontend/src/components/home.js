import { Link } from "react-router-dom"

function Home() {
    return (
        <section>
            <Link to={"/user/login"}>Login</Link>
            <Link to={"/user/register"} >Registrar</Link>
        </section>
    )
}

export default Home