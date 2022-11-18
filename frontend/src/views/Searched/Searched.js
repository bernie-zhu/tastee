import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from 'axios';
import HomeNav from "../../components/HomeNav";
import Cuisines from "../../components/Cuisines";

function Searched() {
    let params = useParams();
    const [searched, setSearched] = useState([]);

    const getSearched = async (name) => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=15&query=${name}&sort=random`);
        setSearched(data.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <motion.div className="body-wrapper"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HomeNav />
            <Cuisines />
            <Grid>
                {searched.map((item) => {
                    return (
                        <Link to={"/recipe/" + item.id}  key={item.id}> 
                            <Card>
                                <img src={item.image} alt="" />
                                <h4>{item.title}</h4>
                            </Card>
                        </Link>
                    )
                })}
            </Grid>
        </motion.div>
    );
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
    text-decoration: none;
`;
const Card = styled.div`
    text-decoration: none;
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        text-decoration: none;
    }
`;

export default Searched;