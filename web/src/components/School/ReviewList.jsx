import React from 'react';

const handleScroll = ({ currentTarget }, onLoadMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const ReviewList = ({ reviews, onLoadMore }) => (
  <div>
    <h2>Reviews</h2>
    <ul className=""
        onScroll={e => handleScroll(e, onLoadMore)}>
      {reviews.map(({ uuid, allText }) => (
        <li key={uuid} className="">
          {allText}
        </li>
      ))}
    </ul>
  </div>
);

export default ReviewList;
