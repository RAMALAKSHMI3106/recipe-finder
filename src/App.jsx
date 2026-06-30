import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [catRes, cuiRes] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        ]);

        const catData = await catRes.json();
        const cuiData = await cuiRes.json();

        setCategories(catData.meals || []);
        setCuisines(cuiData.meals || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilterData();
    fetchRecipes('chicken');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let output = showOnlyFavorites ? favorites : recipes;

    if (selectedCategory) {
      output = output.filter(
        (recipe) => recipe.strCategory === selectedCategory
      );
    }

    if (selectedCuisine) {
      output = output.filter(
        (recipe) => recipe.strArea === selectedCuisine
      );
    }

    setFilteredRecipes(output);
  }, [
    recipes,
    favorites,
    showOnlyFavorites,
    selectedCategory,
    selectedCuisine
  ]);

  const fetchRecipes = async (searchStr) => {
    if (!searchStr.trim()) return;

    setLoading(true);
    setError(null);
    setShowOnlyFavorites(false);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchStr}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (err) {
      setError('Something went wrong while fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError(null);
    setShowOnlyFavorites(false);
    setSelectedCategory('');
    setSelectedCuisine('');

    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch random recipe');
      }

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (err) {
      setError('Could not fetch a random recipe.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    const exists = favorites.some(
      (fav) => fav.idMeal === recipe.idMeal
    );

    if (exists) {
      setFavorites(
        favorites.filter((fav) => fav.idMeal !== recipe.idMeal)
      );
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-brand">🍳 Recipe Finder</div>

        <div className="nav-actions">
          <button
            className={`btn ${
              showOnlyFavorites ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => {
              setShowOnlyFavorites(!showOnlyFavorites);
              setSelectedCategory('');
              setSelectedCuisine('');
            }}
          >
            Favorites ({favorites.length})
          </button>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {!showOnlyFavorites && (
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => fetchRecipes(query)}
            onRandom={fetchRandomRecipe}
            categories={categories}
            cuisines={cuisines}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
          />
        )}

        {showOnlyFavorites && (
          <div className="favorites-header">
            <h2>Your Saved Recipes</h2>

            <button
              className="btn btn-link"
              onClick={() => setShowOnlyFavorites(false)}
            >
              ← Back to all recipes
            </button>
          </div>
        )}

        {loading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        {!loading && !error && (
          <RecipeList
            recipes={filteredRecipes}
            onViewDetails={setSelectedRecipe}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Recipe Finder App | Powered by TheMealDB API
        </p>
      </footer>
    </div>
  );
}

export default App;