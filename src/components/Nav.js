import React from 'react'
import Search from './Search'
import './Nav.css'
import { useLocation } from 'react-router'

function Nav(props) {
    let location = useLocation();
    const chk = location.pathname === "/about";
    console.log(chk);

    return (
        <>
            <nav>
               

                <div className="logo_main">
                    <span id="logo_i">i</span>nfo<span id="logo_s">S</span>team
                </div>

                {/* <div className="search">

                    <input className="Search_txet" placeholder="&#128269; Search Bloge" type="text">
                </div> */}
                 {!chk &&<Search onChange={props.onSearch} />}

            </nav>

            <div className="menu_bar">
                <ul>
                    <li><a href='/' >Home</a></li>
                    <li><a href='/favorites'>Favorites</a></li>
                    <li><a href='/about'>About</a></li>
                   
                </ul>
            </div>
        </>
        // <div classNameName="nav">
        //     <div classNameName="logo">InfoStream</div>
        //     <ul>

        //         <li classNameName='list'><a href='favorites'>Favorites</a></li>
        //        {!fav && <Search onChange={props.onSearch} />}
        //     </ul>
        // </div>

    )
}

export default Nav