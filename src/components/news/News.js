import React, { useCallback, useEffect, useState } from 'react'
import NewsList from './NewsList'
import useHttp from '../hook/http';
import "./News.css"
import LoadingIndicator from '../UI/LoadingIndicator'
import Pagination from './Pagination';
import { data, useLocation, useParams } from 'react-router';
import ErrorModal from '../UI/ErrorModal';
function News(props) {
    const total_page=Math.floor(props.news.length/12);
    console.log(total_page)
    const { pn } = useParams();
    const [newsPage, setNewsPage] = useState({ data: [], pageNum: 1 });
    const { isLoading } = useHttp();
    const error = (Array.isArray(props.news)) ? null : "fetching went wrong";

   
    const pageNews = useCallback( (page) => {
        const news = [];
        console.log(page);
        for (let index = (page - 1) * 12; index < page * 12; index++) {
            if (props.news[index] !== undefined)
                news.push(props.news[index]);
        }
        setNewsPage({ data: news, pageNum: page });
    },[props.news])
    
    
    useEffect(() => {
        if (pn) {
            const pageNumber = Number(pn);
            if (!isNaN(pageNumber)) {
                pageNews(pageNumber);
            }
        }
    }, [pn, pageNews]);

    // const handlePage = (page) => {
    //     pageNews(page)
    // }
    return (
        <>
            <main className="main_container">
                
                {(!isLoading && !error) && <NewsList articles={newsPage.data} />}
            </main>
            <Pagination total_page={total_page} page={newsPage.pageNum} />
        </>
    )
}

export default News