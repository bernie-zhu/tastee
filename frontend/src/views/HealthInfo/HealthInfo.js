import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import HomeNav from "../../components/HomeNav";
// eslint-disable-next-line
import { bmr_values } from "../../components/Data";
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
        physical_factor: 1.55,
        activity_level: ""
    })

    const processUserHealthInfo = (userPerosnalData) => {
        var data = userHealthData
        data.bmi = Math.round((userPerosnalData.weight)/(userPerosnalData.height**2)*703);

        if(userPerosnalData.gender == "male") {
            data.bmr = 66 + (6.23*userPerosnalData.weight) + (12.7*userPerosnalData.height) - (6.8*userPerosnalData.age);
        } else {
            data.bmr = 655 + (4.35*userPerosnalData.weight) + (4.7*userPerosnalData.height) - (4.7*userPerosnalData.age);
        }

        data.bmr = Math.round(data.bmr)

        // console.log(data.bmi)
        if(data.bmi < 18.5) {
            data.bmi_class = "UnderWeight";
        } else if(18.5 <= data.bmi && data.bmi < 25) {
            data.bmi_class = "Normal Weight";
        } else if(25 <= data.bmi && data.bmi < 30) {
            data.bmi_class = "Overweight";
        } else if (data.bmi >= 30) {
            data.bmi_class = "Obese";
        }

        data.required_calories = Math.round(data.bmr*data.physical_factor);
        data.activity_level = "Moderate"
        // console.log(data)
        // setUserHealthData(data);
        return data
        // console.log(userHealthData)
    }

    const getUser = async () => {
        const url = "https://tastee-cs409.herokuapp.com/api/userinfo";
        const { data } = await axios.get(url, config);
        //console.log(data);
        setUserData(data.data);
        setUserHealthData(processUserHealthInfo(data.data));
        // console.log(userHealthData)
    }
  
    useEffect(() => {
    // console.log("called")
    getUser();
    }, []);

    const [options, setOptions] = useState([{ 
        value: "Sedentary", label: 'Sedentary' },
        { value: "Somewhat", label: 'Somewhat Active' },
        { value: "Moderate", label: 'Moderately Active' },
        { value: "Very", label: 'Very Active' },
        { value: "Extreme", label: 'Extra Active' }]);
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errBool, setErrBool] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleSelect = (e) => {
        // console.log("change")
        var factor = userHealthData.physical_factor;
        if(e.value == "Sedentary") {
            factor = 1.2
        } else if(e.value == "Somewhat") {
            factor = 1.37
        } else if(e.value == "Moderate") {
            factor = 1.55
        } else if(e.value == "Very") {
            factor = 1.725
        } else if(e.value == "Extreme") {
            factor = 1.9
        }
        setUserHealthData({...userHealthData, required_calories: Math.round(userHealthData.bmr*factor), activity_level: e.value});
    };

    const config = {
      headers: {
        "auth-token": token
      }
    }
    
    return (
      <div className="App">
        <HomeNav />

        <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Health Information</h3>
                    {/* <h4>Name: {userData.firstName} {userData.lastName}</h4> */}
                    <div className="health_fact_box">
                        <ul>
                            <li><label>Height: {userData.height}</label></li>
                            <li><label>Weight: {userData.weight}</label></li>
                            <li><label>Gender: {userData.gender}</label></li>
                            <li><label>Age: {userData.age}</label></li>
                        </ul>
                        <ul>
                            <li><label>BMI: {userHealthData.bmi}</label></li>
                            <li className={userHealthData.bmi_class == "UnderWeight" ? "underweight" : (userHealthData.bmi_class == "Normal Weight" ? "normal_weight": (userHealthData.bmi_class == "Overweight" ? "overweight": (userHealthData.bmi_class == "Obese" ? "obese" : "")))}><label>BMI Class: {userHealthData.bmi_class}</label></li>
                            <li><label>BMR: {userHealthData.bmr}</label></li>
                            <li><label>Activity Level: {userHealthData.activity_level}</label></li>
                        </ul>
                    </div>
                    <form name="activity_form" className="activity_form">
                        <h4>What is your Activity Level?</h4>
                        <Select
                            onChange={handleSelect}
                            isSearchable
                            options={options}
                            closeMenuOnSelect={true}
                        />
                        <label>Your Required Calorie intake is:</label>
                        <p>{userHealthData.required_calories}</p>
                    </form>
                    
                </div>
            </div>
      </div>
    )
};

export default HealthInfo;