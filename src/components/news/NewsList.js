import { FaRegBookmark, FaBookmark } from "react-icons/fa"; // Bookmark icons
import "./NewsList.css";
import firestore from "../../handlers/firestore";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useFavourite } from "../context/FavouriteContext";
import { toast } from "react-toastify";
import FallbackImg from "../../assets/fallback.jpg" 

function NewsList(props) {
  const { currentUser } = useAuthContext();
  const { writeDoc, deleteDoc } = firestore;
  const { favourites ,setFavourites} = useFavourite();

  const toggleFavorite = async (news) => {
    const favExist = favourites.some((item) => item.url === news.url);

    if (!favExist) {
      const { email } = currentUser;

      const newNews = {
        ...news,
        email,
      };

      try {
        await writeDoc(newNews);
         setFavourites((prev) => [...prev, newNews]);
        toast.success("Added to Favorites!");
      } catch (error) {
         toast.error("Failed to add favorite!");
      }
    } else {
      try {
        await deleteDoc(news.id);
          setFavourites((prev) => prev.filter((item) => item.url !== news.url));
        toast.info("Removed from Favorites");
      } catch (error) {
        toast.error("Failed to remove favorite!");
      }
    }
  };

  if (props.articles.length === 0) {
    return (
      <div>
        <h1>There is no news</h1>
      </div>
    );
  }

  return props.articles.map((news) => {
    const isFavorite = favourites.some((item) => item.url === news.url);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={news.id}
        className="card_container"
      >
        {currentUser && (
          <button
            className="bookmark_button"
            onClick={() => toggleFavorite(news)}
            title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          >
            {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        )}

        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card_img_container"
        >
          <img src={news.image} className="card_image" alt="not Available" onError={(e)=>{e.target.onerror=null; e.target.src=FallbackImg;}} />
        </a>
 
        <div className="card_title_contianer">
          <a
            className="card_title_anchor"
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="card_title">{news.title}</h2>
          </a>
          {news.description ?<p className="card_desc">{news.description}</p>:<p>no description</p>}
        </div>

        <div className="footer_container">
          <div className="author_container">
            <div className="author_info_container">
              <span className="author_date">
                {news.publishedAt?.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  });
}

export default NewsList;
