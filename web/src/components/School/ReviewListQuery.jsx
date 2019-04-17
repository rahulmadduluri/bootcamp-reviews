import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ReviewList from './ReviewList';

const GET_REVIEWS = gql`
  query GetReviews($schoolUUID:ID!, $offset:Int!) {
    reviews(schoolUUID:$schoolUUID, offset:$offset) {
      uuid
      allText
      teachingScore
      courseworkScore
      atmosphereScore
      careerPreparationScore
      overallScore
      helpfulCount
      hasJob
      salaryBefore
      salaryAfter
      schoolGraduationTimestamp
      jobStartTimestamp
      createdTimestamp
    }
  }
`;

const ReviewListQuery = ({ schoolUUID }) => (
  <Query query={GET_REVIEWS} variables={{ schoolUUID: schoolUUID, offset: 0 }}>
    {({ data, fetchMore }) =>
      data && (
        <ReviewList
          reviews={data.reviews || []}
          onLoadMore={() =>
            fetchMore({
              variables: {
                schoolUUID: schoolUUID,
                offset: data.reviews.length
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
      )
    }
  </Query>
);

export default ReviewListQuery;
