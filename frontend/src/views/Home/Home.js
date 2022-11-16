import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

const Home = () => {
    const token = localStorage.getItem("token");

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
        window.location.reload();
    }
    
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/home'}>
              Tastee
            </Link>
            <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={'/home'}>
                      Home
                    </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link">Hello, {user.firstName} </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                    More
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to={'/userinfo'}>
                      User Information
                    </Link>
                    <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>  

        {/* Whatever stuff you need here */}
      </div>
    )
};

export default Home;