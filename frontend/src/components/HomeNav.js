import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GiKnifeFork } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
/* eslint-disable */

function HomeNav() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      height: "",
      weight: "",
      age: "",
      gender: "male"
  })

    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/searched/" + input);
    };

    const config = {
      headers: {
        "auth-token": token
      }
    }

    const getUser = async () => {
      const url = "http://localhost:4000/api/home";
      const { data } = await axios.get(url, config);
      //console.log(data.data);
      setUser(data.data);
    }

    useEffect(() => {
      getUser();
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("trending");
        localStorage.removeItem("vegetarian");
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top border-bottom">
            <div className="container">
                <Link className="navbar-brand" to={'/home'}>
                    <GiKnifeFork />
                    Tastee
                </Link>
                <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/home'}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/healthinfo'}>
                                Health Info
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <FormStyle onSubmit={handleSubmit}>
                                <div>
                                    <FaSearch />
                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                                </div>
                            </FormStyle>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Hello, {user.firstName} </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                                Menu
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to={'/userinfo'}>
                                    User Information
                                </Link>
                                <a className="dropdown-item" onClick={handleLogout}>
                                    Logout
                                </a>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const FormStyle = styled.form`
    div {
        position: relative;
        width: 100%;
    }
    input {
        background: white;
        font-size: 1rem;
        padding: .4rem 2.5rem;
        border-radius: 2rem;
        width: 100%;
        border-color: var(--bs-nav-link-color);
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: var(--bs-nav-link-color);
        font-weight: var(--bs-nav-link-font-weight);
    }
`

export default HomeNav