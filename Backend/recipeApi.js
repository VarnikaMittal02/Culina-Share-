const apiKey = process.env.API_KEY;

module.exports.searchRecipes = async (searchTerm, page) => {
    if(!apiKey) {
        throw new Error("API key not found!");
    }
    // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&page=${page}`;

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (e) {
        console.log(e);
    }
}

module.exports.getRecipeSummary = async (recipeId) => {
    if (!apiKey) {
        throw new Error("API Key not found!");
    }
    
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey: apiKey,
    }
    url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url);
        const jsonRes = await response.json();
        return jsonRes;
    } catch (error) {
        console.log(error);
    }
};

module.exports.getFavouriteRecipesByIds = async (ids) => {
    if(!apiKey) {
        throw new Error("API key not found!");
    }
    
    const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);

    const params = {
        apiKey: apiKey,
        ids: ids.join(",")
    };

    url.search = new URLSearchParams(params).toString();

    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    return {results: json};
}