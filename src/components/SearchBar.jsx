import React from 'react';

const SearchBar = ({ 
  query, 
  setQuery, 
  onSearch, 
  onRandom, 
  categories, 
  cuisines, 
  selectedCategory, 
  setSelectedCategory, 
  selectedCuisine, 
  setSelectedCuisine 
}) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      {/* Search Input Controls */}
      <div className="search-row">
        <input
          type="text"
          placeholder="Search for a recipe (e.g., Chicken, Pasta)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={onSearch} className="btn btn-primary">Search</button>
        <button onClick={onRandom} className="btn btn-secondary">🎲 Random</button>
      </div>

      {/* Filter Dropdowns */}
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="cuisine-select">Cuisine:</label>
          <select
            id="cuisine-select"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="filter-select"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
