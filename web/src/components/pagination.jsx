import React from 'react';
import PropTypes from 'prop-types';
import "./pagination.css"

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const {
      totalItems = null,
      currentPage = null,
      pageLimit = 10,
    } = props;

    this.state = {
      currentPage: currentPage,
      totalPages: Math.ceil(totalItems / pageLimit),
    };
  }

  onPageChoice = (pageNum) => {
    this.props.onSetSearchParams({ pageNumber: pageNum });
  };

  render() {
    return (
      <div className="paginationWrapper">
        <nav className="pagination" role="navigation" aria-label="pagination">
          <ul className="pagination-list">
            {[...Array(this.state.totalPages).keys()].map(num => {
              return (
                <li key={num}>
                  <a
                    onClick={() => this.onPageChoice(num)}
                    className={`pagination-link ${
                      num === this.props.currentPage ? 'is-current' : ''
                    }`}
                    aria-label={`Page ${num}`}
                    aria-current="page"
                  >
                    {num + 1}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
};

export default Pagination;
