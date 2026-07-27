import React from 'react';
import PostComposer from './components/PostComposer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📱 Post Composer</h1>
        <p>Create and publish posts across multiple platforms with real-time validation</p>
      </div>
      <div className="composer-wrapper">
        <PostComposer />
      </div>
    </div>
  );
}

export default App;
