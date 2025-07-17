import React, { useMemo, useState } from "react";
import Search from "../Search";
import News from "./News";
import { useFavourite } from "../context/FavouriteContext";

export const FilterNews = () => {
  const { favourites, loadingNews } = useFavourite();
  const [query, setQuery] = useState("");

  console.log(favourites);
  const filterNews = useMemo(() => {
    return favourites.filter((favourites) =>
      favourites.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [favourites, query]);
  return (
    <>
      <Search onChange={(e) => setQuery(e)} />
      {!loadingNews && <News news={filterNews} />}
    </>
  );
};
