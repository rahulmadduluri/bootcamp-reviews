import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const {
      totalItems = null,
      currentPage = null,
      pageLimit = 9,
      onPageChoice = () => {},
    } = props;

    this.state = {
      totalPages: Math.ceil(totalItems / pageLimit),
    };
  }

  render() {
    return (
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a
          className="pagination-previous"
          title="This is the first page"
          onClick={() => this.props.onPageChoice(this.props.currentPage - 1)}
          disabled={this.props.currentPage == 0}
        >
          Previous
        </a>
        <a
          className="pagination-next"
          onClick={() => this.props.onPageChoice(this.props.currentPage + 1)}
          disabled={this.props.currentPage == this.state.totalPages - 1}
        >Next page</a>
        <ul className="pagination-list">
          {[...Array(this.state.totalPages).keys()].map(num => {
            return (
              <li key={num}>
                <a
                  onClick={() => this.props.onPageChoice(num)}
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
    );
  }
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
};

export default Pagination;
