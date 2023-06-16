// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

// Variables
const mealSearchInput = document.querySelector('#search-input');
const mealSearchButton = document.querySelector('#search-button');
const mealGridContainer = document.querySelector('.meal');
const mealResultsTitle = document.querySelector('#meal-results-title');

const modal = document.querySelector('#modal');
const modalRecipeTitle = document.querySelector('#modal-recipe-title');
const modalRecipeCategory = document.querySelector('#modal-recipe-category');
const modalRecipeInstructions = document.querySelector('#modal-recipe-instructions p');
const modalRecipeImage = document.querySelector('#modal-recipe-img img');
const modalRecipeLink = document.querySelector('#modal-recipe-link');
const closeModalButton = document.querySelector('#close-modal-button');

// HELPER FUNCTIONS

// Resets the Markup
const resetMealResults = function () {
    mealResultsTitle.classList.add('hide');
    mealSearchInput.value = '';

    // Remove Grid Items
    while (mealGridContainer.firstChild) {
        mealGridContainer.removeChild(mealGridContainer.lastChild);
    }
}


// Changes Modal according to the Meal
const changeModal = function (meal) {
    modalRecipeTitle.innerText = meal.strMeal;
    modalRecipeCategory.innerText = meal.strCategory;
    modalRecipeInstructions.innerText = meal.strInstructions;
    modalRecipeImage.src = meal.strMealThumb;
    modalRecipeLink.href = meal.strYoutube;
}


const makeRecipeButtonFunctional = function (recipeButton, meal) {
    recipeButton.innerText = 'Get Recipe';
    recipeButton.classList.add('btn-recipe');
    recipeButton.href = '#';

    // Recipe Button event listener - shows Modal
    // Makes API Call to diff Endpoint - search by meal name
    recipeButton.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`);

            for (let mealBySearch of response.data.meals) {
                if (mealBySearch.strMeal === meal.strMeal) {
                    changeModal(mealBySearch);
                    break;
                }
            }

            modal.showModal();
        }
        catch (err) {
            console.error(err);
            // SOME FUNCTION - prolly a Pop Over displaying problem message or error message
        }
    })

    return recipeButton;
}

// Makes a 'card' for every result meal and places it in the grid
const makeMealCard = function (meal) {
    // Meal Item (Card Container)
    const newMealItem = document.createElement('div');
    newMealItem.classList.add('meal-item');
    newMealItem.classList.add('grid-item');

    // Meal Image
    const newMealImg = document.createElement('div');
    newMealImg.classList.add('meal-img');

    const img = document.createElement('img');
    img.src = meal.strMealThumb;

    newMealImg.append(img);

    // Meal Name
    const newMealName = document.createElement('div');
    newMealName.classList.add('meal-name');

    const name = document.createElement('h3');
    name.innerText = meal.strMeal;

    newMealName.append(name);

    // Meal Recipe
    const newMealRecipe = document.createElement('div');
    newMealRecipe.classList.add('meal-recipe');

    // Recipe Button
    let newRecipeButton = document.createElement('a');
    newRecipeButton = makeRecipeButtonFunctional(newRecipeButton, meal);
    newMealRecipe.append(newRecipeButton);

    // Put all these in Meal Item Container
    newMealItem.append(newMealImg);
    newMealItem.append(newMealName);
    newMealItem.append(newMealRecipe);

    // Append Meal Item Container in Meal Results
    mealGridContainer.append(newMealItem);
}


// Shows a message to the user in case no results match the search term
const showEmptyMealResults = function () {
    // Maybe show a Pop-Over and show no results
    mealResultsTitle.innerText = 'Sorry, no results match your search :(';
}


// Shows a message to the user in case any data fetching fails
const showErrorResults = function () {
    mealResultsTitle.innerText = 'Sorry, we could not get any data right now...please try again later!';
}


// Search Meal Button
mealSearchButton.addEventListener('click', async () => {
    const searchParam = mealSearchInput.value.trim().replace(/\s/g, '_');
    resetMealResults();

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchParam}`);

        if (response.data.meals) {
            mealResultsTitle.innerText = 'Meals for you!';
            for (let meal of response.data.meals) {
                makeMealCard(meal);
            }
        }
        else {
            showEmptyMealResults();
        }
    }
    catch (err) {
        console.error(err);
        showErrorResults();
    }

    mealResultsTitle.classList.remove('hide');
})


// Close Modal Button
closeModalButton.addEventListener('click', () => {
    modal.close();
})