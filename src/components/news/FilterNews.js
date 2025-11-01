import { useMemo, useState } from "react";
import { useFavourite } from "../context/FavouriteContext";
import News from "./News";
import Search from "../Search";

export const FilterNews = () => {
  const { favourites, loadingNews, error, clearError } = useFavourite();
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      favourites.filter((fav) =>
        fav.title.toLowerCase().includes(query.toLowerCase())
      ),
    [favourites, query]
  );

  return (
    <>
      <Search onChange={(e) => setQuery(e)} />
      {loadingNews && <p>Loading your favorites...</p>}
      {!loadingNews && !error && <News news={filtered} />}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>
          <p>Failed to fetch favorites.</p>
          <button onClick={clearError}>Try Again</button>
        </div>
      )}
    </>
  );
};
