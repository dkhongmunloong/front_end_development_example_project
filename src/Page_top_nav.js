import { Link } from 'react-router-dom';

export default function Page_top_nav() {
    // this component has no logic at the moment but setup the nav bar for the site
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-semibold fst-italic text-primary" href="#">
                        L.E.E.P.S
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-4">
                                <Link to={'/aboutus'} className="nav-link active" aria-current="page">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item dropdown mx-4">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Products
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={'/'} className="dropdown-item">
                                            All Products
                                        </Link>
                                    </li>                                  
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-4">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Payment & Delivery
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Credentials
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
