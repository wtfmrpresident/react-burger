import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './store'
import {getCookie} from "./utils/cookie";
import {profile, refreshToken} from "./services/account";
import {ITokenData} from "./utils/auth";
import {BrowserRouter} from "react-router-dom";

const token = getCookie('token')
if (token) {
    store.dispatch(profile())
        .unwrap()
        .catch(() => {
            const refreshTokenValue = getCookie('refreshToken')
            if (refreshTokenValue) {
                const data: ITokenData = {token: refreshTokenValue}
                store.dispatch(refreshToken(data)).unwrap().then(() => {store.dispatch(profile())})
            }
        })
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
