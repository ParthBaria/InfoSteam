import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'; // Bookmark icons
import "./NewsList.css";
import firestore from '../../handlers/firestore';
import { useAuthContext } from '../context/AuthContext';

function NewsList(props) {
    const { currentUser } = useAuthContext();
    const { writeDoc } = firestore;
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = async (news) => {
        const { email } = currentUser;

        const newNews = {
            ...news, email
        }

        try {

            await writeDoc(newNews);
            setFavorites((prevFavs) =>
                prevFavs.includes(news.url)
                    ? prevFavs.filter((url) => url !== news.url)
                    : [...prevFavs, news.url]
            );
        } catch (error) {

        }

    };

    if (props.articles.length === 0) {
        return <div><h1>There is no news</h1></div>;
    }

    return props.articles.map(news => {
        const isFavorite = favorites.includes(news.url);

        return (
            <div key={news.url || news.title} className="card_container">
                {/* Bookmark Button */}
                <button
                    className="bookmark_button"
                    onClick={() => toggleFavorite(news)}
                    title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
                >
                    {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
                </button>

                {/* News Image */}
                <a href={news.url} target="_blank" rel="noopener noreferrer" className="card_img_container">
                    <img
                        src={news.urlToImage}
                        alt="img"
                        className="card_image"
                        loading="lazy"
                    />
                </a>

                {/* Title + Description */}
                <div className="card_title_contianer">
                    <a className="card_title_anchor" href={news.url} target="_blank" rel="noopener noreferrer">
                        <h2 className="card_title">{news.title}</h2>
                    </a>
                    <p className="card_desc">{news.description}</p>
                </div>

                {/* Footer with author/date */}
                <div className="footer_container">
                    <div className="author_container">
                        <div className="author_info_container">
                            <span className="author_name">{news.author || "Unknown"}</span>
                            <span className="author_date">{news.publishedAt?.split('T')[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );

    });
}

export default NewsList;
