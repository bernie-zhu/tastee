import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GiKnifeFork } from "react-icons/gi";
/* eslint-disable */

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {{
        setData({...data, [input.name]: input.value });
        //console.log(data);
    }};

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            const url = "http://localhost:4000/api/signup";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
            }
        }
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        <GiKnifeFork />
                        Tastee
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/signup'}>
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Sign Up</h3>
                
                        <div className="mb-3">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="First name"
                                defaultValue={data.firstName}
                                required
                                onChange={handleChange}
                            />
                        </div>
                
                        <div className="mb-3">
                            <label>Last name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                className="form-control" 
                                placeholder="Last name" 
                                defaultValue={data.lastName}
                                required
                                onChange={handleChange}
                            />
                        </div>
                
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                defaultValue={data.email}
                                required
                                onChange={handleChange}
                            />
                        </div>
                
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                defaultValue={data.password}
                                required
                                onChange={handleChange}
                            />
                        </div>

                        {err && <div className="error_msg"> {err} </div>}
                
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                
                        <p className="forgot-password text-right">
                            Already registered? <a href="/login">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;