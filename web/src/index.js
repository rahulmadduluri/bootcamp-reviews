import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
import auth from './Auth/auth.jsx';
import gql from 'graphql-tag';
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
              minGraduateSalary
              minJobPlacementRate
              minLength
            }
          }
        `;

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
	clientState: {
		defaults: {
			schoolSearchParams: {
				__typename: 'SchoolSearchParams',
				pageNumber: 0,
				searchText: null,
				locationUUID: null,
				paymentType: null,
				maxPrice: null,
				minGraduateSalary: null,
				minJobPlacementRate: null,
				minLength: null,
			}
		},
	    resolvers: {
	      Mutation: {
	        updateSchoolSearchParams: (_, { params }, { cache }) => {

		        const { schoolSearchParams } = cache.readQuery({ query: GET_SCHOOL_PARAMS });

		        let newParams = JSON.parse(JSON.stringify(schoolSearchParams));
		        for (var propertyName in params) {
		        	newParams[propertyName] = params[propertyName];
		        }
				cache.writeData({ data: { 
					schoolSearchParams: newParams
				}});
				return newParams;
			}
	      }
	    }
	}
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
