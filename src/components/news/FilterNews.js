import React, { useMemo, useState } from "react";
import Search from "../Search";
import News from "./News";

export const FilterNews = (props) => {
  const [query, setQuery] = useState("");
  
  const filterNews = useMemo(() => {
    return props.news.filter((news) =>
      news.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [props.news,query]);
  return (
    <>
      <Search onChange={(e) => setQuery(e)} />
      <News news={filterNews} />
    </>
  );
};
