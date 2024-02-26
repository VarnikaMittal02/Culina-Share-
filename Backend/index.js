const express  = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const RecipeApi = require("./recipeApi") ;
const FavouriteRecipe = require("./models/favourites");

const app = express();

app.use(cors());
app.use(express.json());


// Connect to the database
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });



app.get("/api/recipes/search", async (req, res) => {
    //GET http://localhost/api/recipes/search?searchTerm=burgers&page=1
    
    const searchTerm = req.query.searchTerm
    const page = parseInt(req.query.page);
    const results = await RecipeApi.searchRecipes(searchTerm, page);
    
    return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  console.log(recipeId)
  const results = await RecipeApi.getRecipeSummary(recipeId);
  
  return res.json(results);
});

app.post("/api/recipes/favourite", async(req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const favouriteRecipe = await FavouriteRecipe.create({
      recipeId: recipeId
    });

    await  favouriteRecipe.save();
    res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops something went wrong"});
  }
});

app.get("/api/recipes/favourite", async(req, res) => {

  try {
    const favRecipes = await FavouriteRecipe.find();

    const favRecipesIds = favRecipes.map((recipe) => recipe.recipeId);

    const favourites = await RecipeApi.getFavouriteRecipesByIds(favRecipesIds);
     return res.json(favourites);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops something went wrong"});
  }

});

app.delete("/api/recipes/favourite", async(req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await FavouriteRecipe.deleteOne({recipeId: recipeId});

    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops something went wrong"});
  }
})


app.listen(process.env.PORT, (req, res) => {
    console.log(`Listening to port ${process.env.PORT}...`);
})