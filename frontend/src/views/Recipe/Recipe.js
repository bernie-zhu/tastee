import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import HomeNav from "../../components/HomeNav";
import Search from "../../components/Search";
import Cuisines from "../../components/Cuisines";

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
        <motion.div className="container"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HomeNav />
            <Search />
            <Cuisines />

            <DetailWrapper>
                <div>
                    <h4>{details.title}</h4>
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
                    )};
                    {activeTab === "ingredients" && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    )};
                </Info>
            </DetailWrapper>
        </motion.div>
    )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 500;
`

const Info = styled.div`
    margin-left: 10rem;
`

export default Recipe