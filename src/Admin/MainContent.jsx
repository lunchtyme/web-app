import React from 'react';

const MainContent = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      {/* Add your widgets or sections here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-semibold">Widget 1</h3>
          {/* Widget content */}
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-semibold">Widget 2</h3>
          {/* Widget content */}
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-semibold">Widget 3</h3>
          {/* Widget content */}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
