import React, { useEffect, useState } from 'react';
import './Search.css';

function Search({ onChange }) {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(input);
    }, 500); 
    return () => clearTimeout(timeout); 
  }, [input]);

  useEffect(() => {
      onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  return (
    <div className="search">
      <input
        className="search_text"
        type="text"
        placeholder="🔍 Search Blog"
        onChange={handleInputChange}
        value={input}
      />
    </div>
  );
}

export default Search;
