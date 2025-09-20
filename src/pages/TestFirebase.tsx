import React from 'react';
import FirebaseTest from '../components/test/FirebaseTest';

const TestFirebasePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Firebase Configuration Test</h1>
        <FirebaseTest />
      </div>
    </div>
  );
};

export default TestFirebasePage;
