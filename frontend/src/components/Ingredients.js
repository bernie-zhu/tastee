import {React, useState} from 'react'
import Select from 'react-select'
import './Ingredients.css'
import { useNavigate } from "react-router-dom";
import {options} from "./Data";

function Ingredients() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([])
    const [input, setInput] = useState("")

    const HandleChange = (event, updatedType) => {
        let temp = '';
        event.forEach(item => {
            temp += item['value'] + '+'
        });
        setSelected(event);
        setInput(temp.substring(0, temp.length - 1).replaceAll(' ', '-'))
    }

    const handleSubmit = (e) => {
        if (input === "") {
            alert("Please add an ingredient");
            return null;
        }
        e.preventDefault();
        navigate("/searched-ingredient/" + input);
    };

    return (
        <>
        <div className='Select'>
            <h2>Search by Ingredients</h2>
            <Select
                value={selected}
                onChange={HandleChange}
                isMulti
                isSearchable
                options={options} 
                closeMenuOnSelect={false}
            />
        </div>
        <div className='searchbutton'>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Seach</button>
        </div>
        
        </>
    )
}

export default Ingredients;