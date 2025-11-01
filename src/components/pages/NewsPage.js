import React, { useEffect, useState } from "react";
import Description from "../news/Description";
import News from "../news/News";
import Nav from "../Nav";
import Footer from "../Footer";
import Dropdown from "../news/Dropdown";
import useHttp from "../hook/http";
import ErrorModal from "../UI/ErrorModal";
import LoadingIndicator from "../UI/LoadingIndicator";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function NewsPage() {
  const [news, setNews] = useState({ articles: [], totalPages: 1 });
  const [category, setCategory] = useState("");
  const { data, sendRequest, error, isLoading, clearError } = useHttp();
  const { query } = useSearch();
  const { pn } = useParams();
const nav=useNavigate();
  const pageNumber = !isNaN(Number(pn)) && Number(pn) > 0 ? Number(pn) : 1;

  // ✅ Build backend URL dynamically based on filters
  const buildUrl = () => {
    const params = new URLSearchParams();
    params.append("page", pageNumber);
    params.append("limit", 12);

    if (query) {
      params.append("q", query);
      return `https://info-server.vercel.app/api/news/search?${params.toString()}`;
    } else {
      if (category) params.append("category", category);
      return `https://info-server.vercel.app/api/news/top-headlines?${params.toString()}`;
    }
  };

  // ✅ Fetch news whenever page, query, or category changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = buildUrl();
        await sendRequest(url);
      } catch (error) {
        toast.error("Fetching went wrong!");
      }
    };
    fetchNews();
  }, [sendRequest, pageNumber, category, query]);

  // ✅ Update news when data changes
  useEffect(() => {
    if (data && (data.articles || []).length > 0) {
      setNews({
        articles: data.articles,
        totalPages: data.totalPages || 1,
      });
    } else {
      setNews({ articles: [], totalPages: 1 });
    }
  }, [data]);

  // ✅ Handle dropdown category change
  const clickOption = (cat) => {
    setCategory(cat);
  };

  return (
    <>
      {error && (
        <ErrorModal
          msg={error}
          onClose={() => {
            clearError();
            nav("/top")
          }}
        />
      )}
      <Nav />
      <Description />
      <Dropdown onOption={clickOption} />
      {isLoading && <LoadingIndicator />}

      {!isLoading && (
        <News
          news={news.articles}
          totalPages={news.totalPages}
          currentPage={pageNumber}
        />
      )}
      <Footer />
    </>
  );
}

export default NewsPage;
