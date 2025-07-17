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
import { useFavourite } from "../context/FavouriteContext";
import { toast } from "react-toastify";
function NewsPage(props) {
  const [news, setNews] = useState({});
  const { data, sendRequest, error, isLoading } = useHttp();
  const { loadingNews } = useFavourite();
  const { query } = useSearch();

  useEffect(() => {
    const fetch = async () => {
      try {
        await sendRequest(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0a745fb7e28040c28a88252c84d1186d"
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
        ` https://newsapi.org/v2/top-headlines?category=${catag}&apiKey=0a745fb7e28040c28a88252c84d1186d`
      );
    } catch (error) {
      toast.error("fetching went wrong!!");
    }
  };

  useEffect(() => {
    try {
      if (!query) return;
    fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=0a745fb7e28040c28a88252c84d1186d`
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
      {!isLoading && !loadingNews && <News news={news} />}
      <Footer />
    </>
  );
}

export default NewsPage;
