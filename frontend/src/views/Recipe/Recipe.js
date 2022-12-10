import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import HomeNav from "../../components/HomeNav";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const getDetails = async () => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        //console.log(data);
        setDetails(data);
    }

    useEffect(() => {
        getDetails();
        // eslint-disable-next-line
    }, [params.id])

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HomeNav />

            <DetailWrapper>
                <div>
                    <h4>{details.title} - 
                        <a target="_blank" rel="noopener noreferrer" href={details.sourceUrl}> Recipe </a>
                    </h4>
                    <img src={details.image} alt="" />
                    
                </div>
                <Info>
                    <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}> 
                        Instructions 
                    </Button>
                    <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}>
                        Ingredients 
                    </Button>
                    {activeTab === "instructions" && (
                        <div>
                            <h3 dangerouslySetInnerHTML={{__html: details.summary }}></h3>
                            <h3 dangerouslySetInnerHTML={{__html: details.instructions }}></h3>
                        </div>
                    )}
                    {activeTab === "ingredients" && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    )}
                </Info>
            </DetailWrapper>
        </motion.div>
    )
}

const DetailWrapper = styled.div`
    margin: 5% 10% 5% 10%;
    padding: 3% 5% 2% 5%;
    background: white;
    display: flex;
    //flex-wrap: wrap;
    border-radius: 2rem;

    @media (max-width: 1200px) {
        flex-wrap: wrap;
    }

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h4 {
        width: 80%;
        margin-top: 1rem;
        //margin-right: 1rem;
    }
    img {
        margin-top: 1rem;
        transform: scale(.75) translate(-17%, -15%); 
    }
    h3 {
        margin-bottom: 2rem;
        font-size: 1.25rem;
    }
    li {
        font-size: 1rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: .5rem;
    }
`

const Button = styled.button`
    padding: .75rem 1.5rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 500;
    border-radius: 1rem;
    margin-bottom: 1rem;
`

const Info = styled.div`
    margin-left: 1rem;
`

export default Recipe