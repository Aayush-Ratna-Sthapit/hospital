import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {

    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');

        history('/login/');
    };

    const handleLogin = () => {
        history('/login/');
    };

    const handleRegister = () => {
        history('/register/');
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand mx-5" to="/"><h2>A Hospital</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {props.userType === 'patient'
                            ? (
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={`/patient/${props.id}/profile/`}>Profile</Link>
                                    </li>
                                </ul>
                            ) :
                            props.userType === 'doctor'
                                ? (
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to={`/doctor/${props.id}/profile/`}>Profile</Link>
                                        </li>
                                    </ul>
                                ) :
                                props.userType === 'admin'
                                    ? (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/admin/${props.id}/profile/`}>Profile</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/admin/${props.id}/appointments/`}>Appointments</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to={`/admin/${props.id}/users/`}>Users</Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link className="navbar-brand mx-3" to="/">Home</Link>
                                            </li>
                                        </ul>
                                    )
                        }
                    </div>
                    <div>
                        {props.userType === 'doctor' || props.userType === 'patient' || props.userType === 'admin'
                            ? (
                                <button className='btn btn-danger mx-3' onClick={handleLogout}>Logout</button>
                            ) : (
                                <div>
                                    <button className='btn btn-success mx-3' onClick={handleLogin}>Login</button>
                                    <button className='btn btn-success mx-3' onClick={handleRegister}>Register</button>
                                </div>
                            )}


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
