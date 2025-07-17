import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../../handlers/firestore";
import { useAuthContext } from "./AuthContext";

const FavouriteContext = createContext({ favourites: [], loadingNews: true });
export const FavouriteProvider = (props) => {
  const { readDoc } = firestore;
  const { currentUser, loading } = useAuthContext();
  const [favourites, setFavourites] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    if (loading || !currentUser?.email) return;

    const fetchFavourites = async () => {
      setLoadingNews(true);
      try {
        const fetchedNews = await readDoc(currentUser.email);
        console.log(fetchedNews);
        
        setFavourites(fetchedNews || []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchFavourites();
  }, [currentUser, loading, readDoc]);

  const value = { favourites, loadingNews,setFavourites };
  return (
    <FavouriteContext.Provider value={value}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
