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
function NewsPage(props) {
  const [news, setNews] = useState({});
  const { data, sendRequest, error, isLoading } = useHttp();
  const { query } = useSearch();

  useEffect(() => {
    const fetch = async () => {
      try {
        await sendRequest(
          `https://gnews.io/api/v4/top-headlines?category=general&apikey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        
      } catch (error) {
        toast.error("fetching went wrong!!");
      }
    };
    fetch();
  }, [sendRequest]);
  useEffect(() => {
    setNews(data);
  }, [data]);

  const clickOption = async (catag) => {
    try {
      await sendRequest(
        `https://gnews.io/api/v4/top-headlines?category=${catag}&apikey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
    } catch (error) {
      toast.error("fetching went wrong!!");
    }
  };

  useEffect(() => {
    try {
      if (!query) return;
    fetch(
      `https://gnews.io/api/v4/search?q=${query}&apikey=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.articles));
    } catch (error) {
      toast.error("fetching went wrong!!");
    }
    
  }, [query]);

  return (
    <>
      {error && <ErrorModal msg={error} />}
      <Nav />
      <Description />
      <Dropdown onOption={clickOption} />
      {isLoading && <LoadingIndicator />}
      {!isLoading  && <News news={news} />}
      <Footer />
    </>
  );
}

export default NewsPage;
