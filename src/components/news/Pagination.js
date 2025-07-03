import React from 'react'
import { useNavigate } from 'react-router';
import "./Pagination.css"
import { useParams } from 'react-router';
function Pagination(props) {
    const { pn } = useParams();
    const page = Number(pn);
    const total_page = Number(props.total_page);
    console.log(total_page)
    const nav = useNavigate();
    const handleReplace = (page) => {
        
        nav(`/page/${page}`);
        // const customValue = event.target.getAttribute("name");
        // // window.location.replace(page);
        // if(customValue==="next"){

        //     props.onChange(Number(pn)+1);
        // }
    };
    return (
        <div class="pagination">
            {page > 1 && <a onClick={() => { handleReplace(page - 1) }} name={`prev`} class="prev">« Previous</a>}
            <a onClick={handleReplace} name={`on`}>{props.page}</a>
            {page <= total_page && <a onClick={() => { handleReplace(page + 1) }} name={`next`} class="next">Next »</a>}
        </div>

    )
}

export default Pagination