import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import HomeNav from "../../components/HomeNav";
/* eslint-disable */

const HealthInfo = () => {
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        height: "",
        weight: "",
        age: "",
        gender: "male"
    })

    const [userHealthData, setUserHealthData] = useState({
        bmi: 0.0, 
        bmr: 0.0,
        required_calories: 0.0,
        bmi_class: "Normal Weight",
        physical_factor: 1
    })

    const processUserHealthInfo = (userPerosnalData) => {
        // console.log(userPerosnalData)
        var data = userHealthData
        data.bmi = ((userPerosnalData.weight)/(userPerosnalData.height**2)*703).toFixed(2);

        if(userPerosnalData.gender == "male") {
            data.bmr = 66 + (6.23*userPerosnalData.weight) + (12.7*userPerosnalData.height) - (6.8*userPerosnalData.age);
        } else {
            data.bmr = 655 + (4.35*userPerosnalData.weight) + (4.7*userPerosnalData.height) - (4.7*userPerosnalData.age);
        }

        data.bmr = data.bmr.toFixed(2)

        if(data.bmr < 18.5) {
            data.bmi_class = "UnderWeight";
        } else if(18.5 <= data.bmr < 25) {
            data.bmi_class = "Normal Weight";
        } else if(25 <= data.bmr < 30) {
            data.bmi_class = "Overweight";
        } else {
            data.bmi_class = "Obese";
        }

        data.required_calories = (data.bmr*data.physical_factor).toFixed(2);
        // console.log(data)
        // setUserHealthData(data);
        return data
        // console.log(userHealthData)
    }

    const getUser = async () => {
        const url = "http://localhost:4000/api/userinfo";
        const { data } = await axios.get(url, config);
        //console.log(data);
        setUserData(data.data);
        setUserHealthData(processUserHealthInfo(data.data));
        console.log(userHealthData)
    }
  
    useEffect(() => {
    // console.log("called")
    getUser();
    console.log(userData)
    }, []);

    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errBool, setErrBool] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleChange = ({ currentTarget: input }) => {{
        // console.log("change")
        setUserData({...userData, [input.name]: input.value });
        //console.log(newUserData);
        //console.log(userData);
    }};

    const handleToggle = () => {
        if (type == "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    }

    const handleSubmit = async (err) => {
        err.preventDefault();
    }

    const config = {
      headers: {
        "auth-token": token
      }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    
    return (
      <div className="App">
        <HomeNav />

        <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Health Information</h3>
                    <h4>Name: {userData.firstName} {userData.lastName}</h4>
                    <div className="health_fact_box">
                            <ul>
                                <li><label>Height: {userData.height}</label></li>
                                <li><label>Weight: {userData.weight}</label></li>
                                <li><label>Gender: {userData.gender}</label></li>
                                <li><label>Age: {userData.age}</label></li>
                            </ul>
                            <ul>
                                <li><label>BMI: {userHealthData.bmi}</label></li>
                                <li><label>BMI Class: {userHealthData.bmi_class}</label></li>
                                <li><label>BMR: {userHealthData.bmr}</label></li>
                            </ul>
                    </div>
                </div>
            </div>
      </div>
    )
};

export default HealthInfo;