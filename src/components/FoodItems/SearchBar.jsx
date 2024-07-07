import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onFoodSelect, apiKey }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (value) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${value}&api_key=${apiKey}`);
      const data = await response.json();
      setSuggestions(data.foods || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debounceFetchSuggestions(value);
  };

  const handleSuggestionClick = (food, event) => {
    event.preventDefault();
    onFoodSelect(food);
    setQuery('');
    setSuggestions([]);
  };

  // Debounce function to limit API calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const debounceFetchSuggestions = debounce(fetchSuggestions, 300);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search food here..."
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((food) => (
            <li key={food.fdcId} onMouseDown={(event) => handleSuggestionClick(food, event)} className="suggestion-item">
              {food.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
