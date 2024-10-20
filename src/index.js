import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { persistor, store } from './redux/store'; // Import your Redux store
import router from './routes';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> {/* Wrap the app in Redux Provider */}
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}> {/* Router handling */}
        <App />
      </RouterProvider>
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
