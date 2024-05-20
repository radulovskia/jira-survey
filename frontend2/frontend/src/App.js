import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionCollection from './components/CreateQuestionCollection'
import Home from './components/Home';
import AnswerQuestions from './components/AnswerQustion';
import Analytics from './components/Analytics';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuestionCollection />} />
        <Route path="/answer" element={<AnswerQuestions />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );

}

export default App;
