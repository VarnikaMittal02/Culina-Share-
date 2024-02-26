import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

const RecipeCard = ({recipe, onClick, onFavouriteButtonClick, isFavourite}) => {
  return (
    <div className='recipe-card' onClick={() => onClick(recipe)}>
        <img src={recipe.image}/>
        <div className="recipe-card-title">
            <span onClick={(event) => {
              event.stopPropagation();
              onFavouriteButtonClick(recipe)
            }}>
              {isFavourite ? <AiFillHeart size={25} color='red'/> : <AiOutlineHeart size={25}/>}
            </span>
            <h3>{recipe.title}</h3>
        </div>
    </div>
  )
}

export default RecipeCard