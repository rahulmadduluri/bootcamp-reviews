import React from 'react';

function SchoolLogo({ photoURI }) {
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = window.location.protocol + '//localhost:8080/s3/schools/' + photoURI;
  } else {
    console.log("LOL");
    url = '/s3/schools/' + photoURI;
    console.log(url);
  }
  return <img src={url} alt="SchoolLogo" />;
}

export default SchoolLogo;
