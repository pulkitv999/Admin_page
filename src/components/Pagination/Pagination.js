import React from 'react';
import './Button.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate an array of page numbers from 1 to totalPages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    // Decrease currentPage by 1 if it's greater than 1
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Function to handle next page button click
  const handleNextPage = () => {
    // Increase currentPage by 1 if it's less than totalPages
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        {"<"}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? 'active' : ''}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
