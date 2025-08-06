import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../../handlers/firestore";
import { useAuthContext } from "./AuthContext";

const FavouriteContext = createContext({ favourites: [], loadingNews: true });
export const FavouriteProvider = (props) => {
  const { readDoc } = firestore;
  const { currentUser, loading } = useAuthContext();
  const [favourites, setFavourites] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error,setError]=useState(null);

  useEffect(() => {
    if (loading || !currentUser?.email) return;

    const fetchFavourites = async () => {
      setLoadingNews(true);
      try {
        const fetchedNews = await readDoc(currentUser.email);
        setFavourites(fetchedNews || []);
      } catch (error) {
        setError(error.message);
      } finally {
        
      }
      setLoadingNews(false);
    };

    fetchFavourites();
  }, [currentUser, loading, readDoc]);

  const value = { favourites, loadingNews,setFavourites ,error};
  return (
    <FavouriteContext.Provider value={value}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
