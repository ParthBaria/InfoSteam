import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Search.css";

function Search({ onChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [input, setInput] = useState(initialQuery);
  const [debouncedInput, setDebouncedInput] = useState(initialQuery);

  const prevQuery = useRef(initialQuery);

  // 🔹 Handle typing
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 🔹 Debounce typing
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(input.trim()), 500);
    return () => clearTimeout(timeout);
  }, [input]);

  // 🔹 Trigger search + handle navigation
  useEffect(() => {
    const queryChanged = debouncedInput !== prevQuery.current;
    if (!queryChanged) return; // prevent re-running when URL updates

    prevQuery.current = debouncedInput;

    onChange(debouncedInput);

    const isNewsPage =
      location.pathname.startsWith("/page") ||
      location.pathname.startsWith("/top");

    if (isNewsPage) {
      const targetUrl = debouncedInput
        ? `/page/1?q=${encodeURIComponent(debouncedInput)}`
        : "/top";

      const currentUrl = location.pathname + location.search;
      if (currentUrl !== targetUrl) {
        navigate(targetUrl, { replace: true });
      }
    }

  }, [debouncedInput]); // only depend on query itself

  return (
    <div className="search">
      <input
        className="search_text"
        type="text"
        placeholder="🔍 Search News"
        onChange={handleInputChange}
        value={input}
      />
    </div>
  );
}

export default Search;
