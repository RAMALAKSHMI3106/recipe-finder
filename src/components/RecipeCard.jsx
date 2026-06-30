import React from 'react';

const RecipeCard = ({ recipe, onViewDetails, isFavorite, onToggleFavorite }) => {
  return (
    <div className="recipe-card">
      <div className="card-image-container">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="card-image"
          loading="lazy" 
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{recipe.strMeal}</h3>
        <div className="card-badges">
          {recipe.strCategory && <span className="badge category-badge">{recipe.strCategory}</span>}
          {recipe.strArea && <span className="badge cuisine-badge">{recipe.strArea}</span>}
        </div>
        <button 
          onClick={() => onViewDetails(recipe)} 
          className="btn btn-block btn-outline"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
