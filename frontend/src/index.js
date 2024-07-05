import React from 'react';
import ReactDOM from 'react-dom/client';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';
import { legacy_createStore as createStore , applyMiddleware, compose } from 'redux';
import { Auth0Provider } from "./react-auth0-spa";
import App from './App';
import './index.css';

// redux global store
const store = createStore(reducer, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${process.env.REACT_APP_AUTH0_CALLBACK_URL}`,
        audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      }}
    >
      <ThemeProvider>
        <HashRouter basename="/">
          <App />
        </HashRouter>
      </ThemeProvider>
    </Auth0Provider>
  </Provider>
);
