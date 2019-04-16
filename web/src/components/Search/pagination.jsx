import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import "./pagination.css"

class Pagination extends React.Component {

  onPageChoice = async (pageNum) => {
    const updateSchoolSearchParamsMutation = gql`
      mutation UpdateSchoolSearchParams($params:SchoolSearchParams!) {
        updateSchoolSearchParams(params: $params) @client
      }
    `;

    const params = { pageNumber: pageNum };
    await this.props.client.mutate({
      mutation: updateSchoolSearchParamsMutation,
      variables: { params: params }
    });
  };

  totalPages = () => {
    return Math.ceil(this.props.totalItems / this.props.pageLimit);
  };

  render() {

    return (
      <div className="paginationWrapper">
        <nav className="pagination" role="navigation" aria-label="pagination">
          <ul className="pagination-list">
            {[...Array(this.totalPages()).keys()].map(num => {
              return (
                <li key={num}>
                  <a
                    onClick={() => this.onPageChoice(num)}
                    className={`pagination-link ${
                      num === this.props.pageNumber ? 'is-current' : ''
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
  pageLimit: PropTypes.number,
  totalItems: PropTypes.number
};

export default withApollo(Pagination);
