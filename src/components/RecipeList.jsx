import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onViewDetails, favorites, onToggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-results">
        <p>No recipes found matching your criteria. Try another search!</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => {
        const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);
        return (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onViewDetails={onViewDetails}
            isFavorite={isFav}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </div>
  );
};

export default RecipeList;
