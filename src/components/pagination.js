import React from 'react';
import '../styles/pagination.css'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const getPaginationRange=()=>{
  
  const delta = 1;
  const range = [];
  const left = currentPage === totalPages ? totalPages-2 : Math.max(1,currentPage-delta);
  const right = currentPage === 1 ? 3 : Math.min(totalPages,currentPage+delta);

  for(let i=left;i<=right;i++) range.push(i);
  
  return range;
};
const paginationRange = getPaginationRange();

return ( 
<div className="pagination-container">
    <button 
    className ='pagination-button'
    onClick={()=> onPageChange(currentPage-1)}
    disabled={currentPage === 1}>
    &lt;
    </button>
  <span className="page-info">Page {currentPage} of {totalPages}</span>
  {paginationRange.map((page)=>(
    <button
        key={page}
        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        onClick={()=>( typeof page === 'number' && onPageChange(page))}
        >{page}</button>
  ))}
  <button
  className="pagination-button"
  onClick={()=> onPageChange(currentPage+1)}
  disabled={currentPage===totalPages}>
     &gt;
  </button>
  </div>)
};

export default Pagination;
