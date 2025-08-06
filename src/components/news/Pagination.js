import React from 'react'
import { Link, useNavigate } from 'react-router';
import "./Pagination.css"
import { useParams } from 'react-router';
function Pagination(props) {
    const { pn } = useParams();
    const page = Number(pn);
    const total_page = Number(props.total_page);
    const nav = useNavigate();
    const handleReplace = (page) => {
        
        nav(`/page/${page}`);
       
    };
    return (
        <div className="pagination">
            {page > 1 && <Link onClick={() => { handleReplace(page - 1) }} name={`prev`} className="prev">« Previous</Link>}
            <Link onClick={handleReplace} name={`on`}>{props.page}</Link>
            {page <= total_page && <Link onClick={() => { handleReplace(page + 1) }} name={`next`} className="next">Next »</Link>}
        </div>

    )
}

export default Pagination