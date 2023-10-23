import { Link } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'

function Navbar() {
    return (
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/">
                        <BiCameraMovie />MoviesLib
                    </Link>
                </h2>
                <form>
                    <input type="text" placeholder="Busque um filme" />
                    <button type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </nav>
        </div>
    )
}

export default Navbar