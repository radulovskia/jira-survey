import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionCollection from './components/CreateQuestionCollection'
import Home from './components/Home';
import AllQuestions from './components/AllQuestions';
import AnswerQuestions from './components/AnswerQustion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuestionCollection />} />
        <Route path="/answer" element={<AnswerQuestions />} />
        <Route path="/all" element={<AllQuestions />} />
    </Routes>
  </Router>
);
    
}

export default App;
