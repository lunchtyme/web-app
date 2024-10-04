import React, { useEffect, useState } from 'react';
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
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 50); // Progress bar update interval

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      onComplete(); // Notify Main only after progress reaches 100
    }
  }, [progress, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-10">
        <img src="/images/lunchtyme-black.svg" alt="" className="w-[10rem]" />
      </div>
      <div className="w-64 bg-gray-300 rounded-sm h-2">
        <div className="bg-gray-800 h-2 rounded-lg" style={{ width: `${progress}%` }}></div>
      </div>
      {/* <p className="mt-4 text-gray-700">{Math.round(progress)}%</p> */}
    </div>
  );
};

const Main = () => {
  const [progressCompleted, setProgressCompleted] = useState(false);

  const handleProgressComplete = () => {
    setProgressCompleted(true);
  };

  if (!progressCompleted) {
    return <Preloader onComplete={handleProgressComplete} />;
  }

  return <App />;
};

createRoot(document.getElementById('root')).render(

    <Main />

);
