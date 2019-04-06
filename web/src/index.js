import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
	uri: "/api"
});

ReactDOM.render(
  <ApolloProvider client={client}>
  	<BrowserRouter>
    	<App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();
