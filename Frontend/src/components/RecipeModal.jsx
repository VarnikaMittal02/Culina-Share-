import React, { useEffect, useState } from 'react'
import * as RecipeApi from "../api.js";

const RecipeModal = ({recipeId, onClose}) => {
    const [recipeSummary, setRecipeSummary] = useState(null);
    
    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                let summaryRecipe = await RecipeApi.getRecipeSummary(recipeId);
                setRecipeSummary(summaryRecipe);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRecipeSummary();
    }, [recipeId]);
    
    return (
    <>
        <div className='overlay'></div>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>RECIPE TITLE</h2>
                    <span className='close-btn' onClick={onClose}>
                        &times;
                    </span>
                </div>
                <p dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}></p>
            </div>
        </div>
    </>
  )
}

export default RecipeModal