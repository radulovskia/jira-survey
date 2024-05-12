import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Question Management App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Collection</Link>
        <Link to="/all">All Questions</Link>
        <Link to="/answer">Answer</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
    </div>
  );
};

export default Home;
