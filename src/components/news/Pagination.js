import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Pagination.css";

function Pagination({ total_page }) {
  const { pn } = useParams();
  const page = Number(pn);
  const nav = useNavigate();
  const location = useLocation();

  const handleReplace = (newPage) => {
    if (newPage >= 1 && newPage <= total_page) {
      const params = new URLSearchParams(location.search);
      nav(`/page/${newPage}?${params.toString()}`);
    }
  };

  return (
    <div className="pagination">
      <a
        className={`prev ${page === 1 ? "disabled" : ""}`}
        onClick={() => handleReplace(page - 1)}
      >
        Prev
      </a>

      <a className="active">{page}</a>

      <a
        className={`next ${page === total_page ? "disabled" : ""}`}
        onClick={() => handleReplace(page + 1)}
      >
        Next
      </a>
    </div>
  );
}

export default Pagination;
