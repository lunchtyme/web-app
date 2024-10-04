import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
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
    }, 350); // Progress bar update interval

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-10">
        <h2 className="text-2xl font-semibold text-gray-500">
          Lunch<span className="text-gray-600">tyme</span>
        </h2>
      </div>
      <div className="w-64 bg-gray-300 rounded-sm h-2">
        <div className="bg-gray-800 h-2 rounded-lg" style={{ width: `${progress}%` }}></div>
      </div>
      {/* <p className="mt-4 text-gray-700">{Math.round(progress)}%</p> */}
    </div>
  );
};

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [progressCompleted, setProgressCompleted] = useState(false);

  useEffect(() => {
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

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
);
