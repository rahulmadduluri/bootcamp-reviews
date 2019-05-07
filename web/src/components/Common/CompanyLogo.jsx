import React from 'react';

function CompanyLogo({ photoURI }) {
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = window.location.protocol + '//localhost:8080/s3/companies/' + photoURI;
  } else {
    url =
      '/s3/companies/' +
      photoURI;
  }
  return <img src={url} alt="CompanyLogo" />;
}

export default CompanyLogo;
