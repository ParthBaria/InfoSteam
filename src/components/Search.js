import React, { useEffect, useRef, useState } from 'react'
import useHttp from './hook/http';
import "./Search.css"
function Search({onChange}) {
    const [filterState, setFilterstate] = useState("");
    const { data, sendRequest } = useHttp();
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {

            if (filterState === inputRef.current.value && filterState !== '') {
                sendRequest(`https://newsapi.org/v2/everything?q=${filterState}&apiKey=0a745fb7e28040c28a88252c84d1186d`)
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [filterState, inputRef, sendRequest])
    useEffect(() => {
        onChange(data);
    }, [data,onChange])
    return (
        <>
            <div className="search">
                <input ref={inputRef} className="search_text " value={filterState} type="text" placeholder="&#128269; Search Bloge" onChange={event => { setFilterstate(event.target.value) }} />
            </div>
        </>
    )
}

export default Search