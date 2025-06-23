import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CiStopwatch, CiEdit } from "react-icons/ci";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Items() {
    const recipe = useLoaderData();
    const recipes = Array.isArray(recipe) ? recipe : [];
    const [allRecipes, setAllRecipes] = useState([]);
    const [search, setSearch] = useState("");

    const path = window.location.pathname === "/myRecipe";
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipe]);

    useEffect(() => {
        const filtered = recipes.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setAllRecipes(filtered);
    }, [search, recipe]);

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/recipe/${id}`);
            setAllRecipes(prev => prev.filter(rec => rec._id !== id));
            const filterItem = favItems.filter(rec => rec._id !== id);
            localStorage.setItem("fav", JSON.stringify(filterItem));
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    const myFav = (item) => {
        const exists = favItems.some(rec => rec._id === item._id);
        favItems = exists
            ? favItems.filter(rec => rec._id !== item._id)
            : [...favItems, item];
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavRecipe(prev => !prev);
    };

    return (
        <>
            <div style={{ padding: "1rem", textAlign: "center" }}>
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    style={{
                        padding: "0.5rem",
                        width: "60%",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div className="card-container">
                {
                    allRecipes?.map((item, index) => (
                        <div key={index} className="card">
                            <Link to={`/recipe-details/${item._id}`}>
                                <img
                                    src={`http://localhost:3000/images/${item.photo}`}
                                    width="120px"
                                    height="100px"
                                    alt="food"
                                />
                            </Link>
                            <div className="card-body">
                                <div className="title">{item.title}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <CiStopwatch /> {item.time}
                                    </div>
                                    {!path ? (
                                        <FaHeartCircleCheck
                                            onClick={() => myFav(item)}
                                            style={{
                                                color: favItems.some(rec => rec._id === item._id) ? "red" : ""
                                            }}
                                        />
                                    ) : (
                                        <div className="action">
                                            <Link to={`/editRecipe/${item._id}`} className="editIcon"><CiEdit /></Link>
                                            <RiDeleteBin6Line onClick={() => onDelete(item._id)} className="deleteIcon" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
