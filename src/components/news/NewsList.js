import React from 'react'
import "./NewsList.css"
import img from "../digital health card.png"

function NewsList(props) {
    if (props.articles.length === 0) {
        return <div>
            <h1>there is no news</h1>
        </div>
    }
    // console.log(props.articles[0].urlToImage);
    return (
        props.articles.map(news => {
            return (
                <div key={Math.random()} className="card_container">
                    <a href={news.url} className="card_img_container">
                        <img
                            src={news.urlToImage}
                            alt={img}
                            className="card_image"
                            loading="lazy"
                        />
                    </a>

                    <div className="card_title_contianer">
                        <a className="card_title_anchor" >
                            <h2 className="card_title">{news.title}</h2>
                        </a>

                        <p className="card_desc">{news.description}
                        </p>

                    </div>


                    <div className="footer_container">
                        <div className="author_container">
                            <div className="author_info_container">
                                <span className="author_name">{news.author}</span>
                                <span className="author_date">{news.publishedAt} </span>
                            </div>
                        </div>
                    </div>
                </div>)
        })
    )
}


export default NewsList