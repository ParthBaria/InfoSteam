import React, { useEffect, useState } from 'react'
import Description from '../news/Description'
import News from '../news/News'
import Nav from "../Nav"
import Footer from "../Footer"
import Dropdown from '../news/Dropdown'
import useHttp from '../hook/http'
import ErrorModal from '../UI/ErrorModal'
import LoadingIndicator from '../UI/LoadingIndicator'
function NewsPage(props) {
    const [news, setNews] = useState({});
    const { data, sendRequest, error, isLoading } = useHttp();

    useEffect(() => {
        const fetch = async () => {
            await sendRequest("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0a745fb7e28040c28a88252c84d1186d")
        }
        fetch();
    }, [sendRequest])
    useEffect(() => {
        console.log(data);
        setNews(data)
    }, [data])

    const clickOption = async (catag) => {
        await sendRequest(` https://newsapi.org/v2/top-headlines?category=${catag}&apiKey=0a745fb7e28040c28a88252c84d1186d`)
    }

    function searchHandle(news) {
        console.log(news)
        // setNews(news)
    }
    return (
        <>
            {error && <ErrorModal msg={error}  />}
            <Nav onSearch={searchHandle} />
            <Description />
            <Dropdown onOption={clickOption} />
            {isLoading && <LoadingIndicator />}
            {!isLoading &&<News news={news} />}
            <Footer />
        </>
    )
}

export default NewsPage