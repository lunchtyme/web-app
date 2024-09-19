import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import MobileDetect from 'mobile-detect';
import './index.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete(); // Notify Main when progress completes
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250); // Progress bar update interval

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-10">
        <h2 className="text-4xl font-semibold">
          Lunch<span className="text-green-600">tyme</span>
        </h2>
      </div>
      <div className="w-96 bg-gray-300 rounded-sm h-2.5">
        <div className="bg-green-600 h-2.5 rounded-lg" style={{ width: `${progress}%` }}></div>
      </div>
      {/* <p className="mt-4 text-gray-700">{Math.round(progress)}%</p> */}
    </div>
  );
};

const Main = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressCompleted, setProgressCompleted] = useState(false);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(!!md.mobile());

    // Simulate content loading with a delay
    const loadTime = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust load time if necessary

    return () => clearTimeout(loadTime); // Cleanup timeout on unmount
  }, []);

  const handleProgressComplete = () => {
    setProgressCompleted(true);
  };

  if (loading || !progressCompleted) {
    return <Preloader onComplete={handleProgressComplete} />;
  }

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
