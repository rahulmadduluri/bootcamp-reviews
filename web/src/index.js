import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import { ApolloProvider } from "react-apollo";
import auth from './Auth/auth.jsx';
import gql from 'graphql-tag';
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { persistCache } from 'apollo-cache-persist';
import './index.css';
import * as serviceWorker from './serviceWorker';

const GET_SCHOOL_PARAMS = gql`
          query GetSchoolSearchParams {
            schoolSearchParams @client {
              pageNumber
              searchText
              locationUUID
              paymentType
              maxPrice
              minLength
            }
          }
        `;

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache: cache,
	uri: "/api",
	request: operation => {
		operation.setContext(context => ({
		  headers: {
		    ...context.headers,
		    authorization: auth.getIdToken(),
		  },
		}));
	},
	clientState: {
		defaults: {
			schoolSearchParams: {
				__typename: 'SchoolSearchParams',
				pageNumber: 0,
				searchText: null,
				locationUUID: null,
				paymentType: null,
				maxPrice: null,
				minLength: null,
			}
		},
	    resolvers: {
	      Mutation: {
	        updateSchoolSearchParams: (_, { params }, { cache }) => {

		        const { schoolSearchParams } = cache.readQuery({ query: GET_SCHOOL_PARAMS });

		        // copy params into updated params object 
		        let updatedParams = JSON.parse(JSON.stringify(schoolSearchParams));
		        for (var propertyName in params) {
		        	updatedParams[propertyName] = params[propertyName];
		        }

		        // if params don't have a page #, reset to 0 (new search)
		        if (!params.pageNumber) {
		        	updatedParams.pageNumber = 0;
		        }

				cache.writeData({ data: { 
					schoolSearchParams: updatedParams
				}});
				return updatedParams;
			}
	      }
	    }
	}
});

const setupAndRender = async () => {
	await persistCache({
		cache,
		storage: localStorage
	});
	ReactDOM.render(
	  <ApolloProvider client={client}>
	  	<BrowserRouter>
	    	<App />
	    </BrowserRouter>
	  </ApolloProvider>,
	  document.getElementById('root')
	);
}

setupAndRender();

serviceWorker.register();
