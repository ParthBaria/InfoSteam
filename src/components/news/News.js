import React from "react";
import NewsList from "./NewsList";
import "./News.css";
import Pagination from "./Pagination";
import { useParams } from "react-router";

function News({ news, totalPages, currentPage }) {

  const { pn } = useParams();
  const pageNum = Number(pn) > 0 ? Number(pn) : currentPage || 1;

  return (
    <>
      <main className="main_container">
        {news && news.length > 0 ? (
          <NewsList articles={news} />
        ) : (
          <p>Loading news...</p>
        )}
      </main>
      {totalPages > 1 && <Pagination total_page={totalPages} page={pageNum} />}
    </>
  );
}

export default News;
