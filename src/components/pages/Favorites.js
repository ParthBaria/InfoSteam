import React from 'react'
import Nav from '../Nav'
import Auth from '../Fav/Auth'

function Favorites() {
    function searchHandle(){
        console.log("hy")
    }
    return (
        <>
            <Nav onSearch={searchHandle} />
            <Auth/>
        </>
    )
}

export default Favorites