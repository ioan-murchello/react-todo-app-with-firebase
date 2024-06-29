import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
import { UserCTX } from './userContext';

import './firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserCTX>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </UserCTX>
  </React.StrictMode>
);
