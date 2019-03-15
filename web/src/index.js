import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
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

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
