import React, { useEffect, useState } from 'react'

function Header() {

    const [user, setUser] = useState();

    const logout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = "/client"
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userInfo")));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-dark ">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="/dashboard">carX CLIENT</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ color: "white" }}
                >
                    <span className="navbar-toggler-icon">
                        <i class="fa-solid fa-bars"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active text-light" aria-current="page" href="/booking">Booking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/requestedslots">Requested Slots</a>
                        </li>
                    </ul>

                </div>

                {user ?
                    (
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt='img' width="40" height="40" className="rounded-circle" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href='/client' onClick={logout}>Logout</a></li>
                            </ul>
                        </div>
                    )
                    :
                    (
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt='img' width="40" height="40" className="rounded-circle" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href='/client'>Login/Signup</a></li>
                            </ul>
                        </div>
                    )
                }

            </div>
        </nav>

    )
}

export default Header