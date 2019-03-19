import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";


const client = new ApolloClient({
	uri: "api"
});

client
  .query({
    query: gql`
      {
        school(uuid: "uuid-1") {
          uuid
          name
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();
