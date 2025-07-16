import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import News from "../news/News";
import firestore from "../../handlers/firestore";
import { useAuthContext } from "../context/AuthContext";
import { FilterNews } from "../news/FilterNews";

function Favorites() {
  const { readDoc } = firestore;
  const { currentUser, loading } = useAuthContext();
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    if (loading || !currentUser?.email) return;

    setLoadingNews(true);
    readDoc(currentUser.email)
      .then((fetchedNews) => {
        setNews(fetchedNews);
      })
      .finally(() => {
        setLoadingNews(false);
      });

  }, [currentUser, loading]);

  return (
    <>
      <Nav />
      {!currentUser && <div>Login to use this</div>}
      {currentUser && !loadingNews && <FilterNews news={news} />}
    </>
  );
}

export default Favorites;
