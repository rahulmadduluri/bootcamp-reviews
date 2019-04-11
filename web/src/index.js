import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
import auth from './Auth/auth.jsx';
import './index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
	uri: "/api",
	request: operation => {
		operation.setContext(context => ({
		  headers: {
		    ...context.headers,
		    authorization: auth.getIdToken(),
		  },
		}));
	},
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
