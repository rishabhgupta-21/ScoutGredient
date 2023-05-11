// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

// Variables
const mealSearchInput = document.querySelector('#search-input');
const mealSearchButton = document.querySelector('#search-button');
const modal = document.querySelector('#modal');
const recipeButton = document.querySelector('#recipe-button');
const closeModalButton = document.querySelector('#close-modal-button');



// Recipe Button - shows Modal
recipeButton.addEventListener('click', () => {
    modal.showModal();
})

// Close Modal Button
closeModalButton.addEventListener('click', () => {
    modal.close();
})