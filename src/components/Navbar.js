import { NavLink } from "react-router-dom"

function Navbar () {
    return(
        <div className="border bg-body-tertiary">
            <ul className="nav nav-pills justify-content-center mt-3 mb-3 fs-5">
                <li className="nav-item me-1">
                    <NavLink className='nav-link' activeclassname='active' to={'/'}>New Subscriber</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className='nav-link' activeclassname='active' to={'/subscribers'}>List of Subscribers</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar