import React, { Component } from 'react';

class ReviewList extends Component {

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let D = document;
    let docHeight = Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );

    if ((window.innerHeight + window.pageYOffset) >= docHeight) {
      this.props.onLoadMore();
    }
  };

  render() {
    return (
      <div>
        <h2>Reviews</h2>
        <ul className="">
          {this.props.reviews.map(({ uuid, allText }) => (
            <li key={uuid} className="">
              {allText}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ReviewList;
