import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/recipe/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => {
        console.error("Error fetching recipe:", err.message);
        setError("Unable to load recipe.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      <img src={`http://localhost:3000/images/${recipe.photo}`} alt="food" />
      <h2>{recipe.title}</h2>
      <p><strong>Time:</strong> {recipe.time}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>
    </div>
  );
}
