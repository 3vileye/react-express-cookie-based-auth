import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import { AuthProvider } from './context/auth.context';
import { TitleProvider } from './context/Title.context';
import { AppRoutes } from './routes/AppRoutes';
import { Provider } from 'react-redux';
import {store} from './state/store';
import {setupAxios} from './_services/interceptor';

setupAxios(axios);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <TitleProvider>
          <AppRoutes />
        </TitleProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);