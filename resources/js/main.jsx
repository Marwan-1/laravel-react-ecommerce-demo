import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';

// Laravel's bootstrap file can be included if needed, but is often not for a pure SPA
// import './bootstrap';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);