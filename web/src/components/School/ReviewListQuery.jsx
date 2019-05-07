import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ReviewList from './ReviewList';

const GET_REVIEWS = gql`
  query GetReviews($schoolUUID:ID!, $offset:Int!) {
    reviews(schoolUUID:$schoolUUID, offset:$offset) {
      uuid
      schoolLocation {
        uuid
        city {
          name
        }
      }
      title
      studentExperience
      studentAdvice
      teachingScore
      courseworkScore
      atmosphereScore
      careerPreparationScore
      overallScore
      helpfulUpvotes
      helpfulDownvotes
      didGraduate
      hasJob
      companyLocation {
        uuid
        city {
          name
        }
      }
      salaryBefore
      salaryAfter
      schoolGraduationTimestamp
      jobFoundTimestamp
      createdTimestamp
    }
  }
`;

const ReviewListQuery = ({ schoolUUID, reviewSummary }) => (
  <Query
    query={GET_REVIEWS}
    variables={{ schoolUUID: schoolUUID, offset: 0 }}
    fetchPolicy="cache-and-network"
  >
    {({ data, fetchMore }) => {
      if (data) {
        return (
          <ReviewList
            reviews={data.reviews || []}
            reviewSummary={reviewSummary}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  schoolUUID: schoolUUID,
                  offset: data.reviews ? data.reviews.length : 0
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    reviews: [...prev.reviews, ...fetchMoreResult.reviews]
                  });
                }
              })
            }
          />
        );
      } else {
        return (<div></div>);
      }
    }
  }
  </Query>
);

export default ReviewListQuery;
