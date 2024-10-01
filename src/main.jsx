import React from 'react';
import { createRoot } from 'react-dom/client'; // Change the import source
import App from './App';
import './index.css';
import { insertCoin } from 'playroomkit';

insertCoin({
  skipLobby: true,
}).then(() => {
  const root = createRoot(document.getElementById('root')); // Use createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
