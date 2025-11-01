import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../../handlers/firestore";
import { useAuthContext } from "./AuthContext";

const FavouriteContext = createContext({
  favourites: [],
  loadingNews: true,
  error: null,
  setFavourites: () => {},
  clearError: () => {},
});

export const FavouriteProvider = (props) => {
  const { readDoc } = firestore;
  const { currentUser, loading } = useAuthContext();

  const [favourites, setFavourites] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ Don’t run until user is known
    if (loading || !currentUser?.email) return;

    const fetchFavourites = async () => {
      setLoadingNews(true);
      setError(null); // ✅ reset old errors before fetch
      try {
        const fetchedNews = await readDoc(currentUser.email);
        setFavourites(fetchedNews || []);
      } catch (err) {
        console.error("🔥 Error fetching favourites:", err.message);
        setError(err.message || "Failed to fetch favorites.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchFavourites();
  }, [currentUser, loading, readDoc]);

  const clearError = () => setError(null); // ✅ allow manual error reset

  const value = { favourites, loadingNews, setFavourites, error, clearError };

  return (
    <FavouriteContext.Provider value={value}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
