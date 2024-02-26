import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([
    {
      "id": 649195,
      "title": "Lamb Burgers With Tzatziki Sauce",
      "image": "https://spoonacular.com/recipeImages/649195-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 664011,
      "title": "Turkey Burgers",
      "image": "https://spoonacular.com/recipeImages/664011-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 1096267,
      "title": "Turkey Burgers with Slaw",
      "image": "https://spoonacular.com/recipeImages/1096267-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 659058,
      "title": "Salmon Burgers With Roasted Red Pepper Aioli",
      "image": "https://spoonacular.com/recipeImages/659058-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 642540,
      "title": "Falafel Burgers",
      "image": "https://spoonacular.com/recipeImages/642540-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 1096060,
      "title": "Chicken Burgers with Spiced Rub",
      "image": "https://spoonacular.com/recipeImages/1096060-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 648303,
      "title": "Itty Bitty Burgers",
      "image": "https://spoonacular.com/recipeImages/648303-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 635350,
      "title": "Blue Cheese Burgers",
      "image": "https://spoonacular.com/recipeImages/635350-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 642695,
      "title": "Feta Stuffed Burgers",
      "image": "https://spoonacular.com/recipeImages/642695-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 632874,
      "title": "Asian Salmon Burgers With Tangy Ginger Lime Sauce",
      "image": "https://spoonacular.com/recipeImages/632874-312x231.jpg",
      "imageType": "jpg"
    }
  ]);
  const [favRecipes, setFavRecipes] = useState([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavRecipes();
  }, []);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedTab, setSelectedTab] = useState("search");

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavRecipes([...favRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favRecipes.filter(
        (favRecipe) => recipe.id != favRecipe.id
      );

      setFavRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="./hero-image.jpg" />
        <div className="title">Foodie</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}
        >
          Favourites
        </h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit"><AiOutlineSearch size={40}/></button>
          </form>

          <div className="recipe-grid">
          {recipes.map((recipe, index) => {
            const isFavourite = favRecipes.some(
              (favRecipe) => recipe.id === favRecipe.id
            );

            return (
              <RecipeCard
                recipe={recipe}
                onClick={(recipe) => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={(recipe) =>
                  isFavourite
                    ? removeFavouriteRecipe(recipe)
                    : addFavouriteRecipe(recipe)
                }
                isFavourite={isFavourite}
              />
            );
          })}
          </div>

          <button onClick={handleViewMore} className="view-more-button">
            View More
          </button>
        </>
      )}

      {selectedTab === "favourites" && (
        <div className="recipe-grid">
          {favRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={(recipe) => removeFavouriteRecipe(recipe)}
              isFavourite={true}
            />
          ))}
        </ div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id}
          onClose={() => setSelectedRecipe(null)}
        />
      ) : null}
    </div>
  );
}

export default App;
