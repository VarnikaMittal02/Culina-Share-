const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favSchema = new Schema({
    recipeId: {
        type: String,
        unique: true,
    }
});

const FavouriteRecipe = mongoose.model("FavouriteListing", favSchema);

module.exports = FavouriteRecipe;