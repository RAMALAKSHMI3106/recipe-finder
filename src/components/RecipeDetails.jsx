import React from 'react';

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // Extract ingredients and measurements from api schema
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        <div className="modal-body">
          <div className="modal-left">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="modal-image" />
            <h2 className="modal-title">{recipe.strMeal}</h2>
            <div className="modal-meta">
              <span className="badge category-badge">{recipe.strCategory}</span>
              <span className="badge cuisine-badge">{recipe.strArea}</span>
            </div>
            
            {recipe.strYoutube && (
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-youtube"
              >
                📺 Watch Video Tutorial
              </a>
            )}
          </div>
          
          <div className="modal-right">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {getIngredients().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h3>Instructions</h3>
            <p className="instructions-text">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
