import React from 'react';
import { Link } from 'react-router-dom';
import './pagination.scss';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination' id='pagination'>
        {pageNumbers.map((number) => (
          <li className='page-item' key={number}>
            <Link to={`/home`} onClick={() => paginate(number)} className='page-link'>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
