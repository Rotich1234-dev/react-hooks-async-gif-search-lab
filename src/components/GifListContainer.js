import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

const GifListContainer = () => {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=g7mcTRlXvpvi8OOLJU4uk7HlXghwzjHD`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Giphy API');
        }

        const data = await response.json();

        setGifs(data.data.slice(0, 3)); // Store the first 3 gifs in state
      } catch (error) {
        console.error(error.message);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <GifSearch onSearchSubmit={handleSearchSubmit} />
      <GifList gifs={gifs} />
    </div>
  );
};

export default GifListContainer;