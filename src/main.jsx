import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import MobileDetect from 'mobile-detect';
import './index.css';

const Main = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(!!md.mobile());
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-restricted bg-red-500 text-white text-center p-10">
        <h1 className="text-3xl font-bold">Mobile Access Restricted</h1>
        <p className="mt-4">
          This site is not accessible on mobile devices. Please visit from a desktop or tablet.
        </p>
      </div>
    );
  }

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>,
);
