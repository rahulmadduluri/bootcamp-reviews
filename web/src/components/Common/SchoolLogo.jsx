import React, { Component } from 'react';

function SchoolLogo({ photoURI }) {
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = window.location.protocol + '//localhost:8080/s3/schools/' + photoURI;
  } else {
    url =
      window.location.protocol +
      window.location.hostname +
      '/s3/schools/' +
      photoURI;
  }
  return <img src={url} alt="SchoolLogo" />;
}

export default SchoolLogo;
