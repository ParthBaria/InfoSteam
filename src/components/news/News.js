import React, { useCallback, useEffect, useState } from "react";
import NewsList from "./NewsList";
import "./News.css";
import Pagination from "./Pagination";
import { useParams } from "react-router";
function News(props) {
  const { pn } = useParams();
  const [newsPage, setNewsPage] = useState({ data: [], pageNum: 1 });
  const error = Array.isArray(props.news) ? null : "fetching went wrong";

  const total_page = Math.floor(props.news.length / 12);

  const pageNews = useCallback(
    (page) => {
      const news = [];

      for (let index = (page - 1) * 12; index < page * 12; index++) {
        if (props.news[index] !== undefined) news.push(props.news[index]);
      }
      setNewsPage({ data: news, pageNum: page });
    },
    [props.news]
  );

  useEffect(() => {
    if (pn) {
      const pageNumber = Number(pn);
      if (!isNaN(pageNumber)) {
        pageNews(pageNumber);
      }
    }
  }, [pn, pageNews]);

  return (
    <>
      <main className="main_container">
        {!error && <NewsList articles={newsPage.data} />}
      </main>
      {total_page > 1 && (
        <Pagination total_page={total_page} page={newsPage.pageNum} />
      )}
    </>
  );
}

export default News;
