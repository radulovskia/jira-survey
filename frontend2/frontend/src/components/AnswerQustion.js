import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const fetchSurveys = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/surveys/');
      setSurveys(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurveyClick = async (surveyId) => {
    setSelectedSurvey(null);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/surveys/${surveyId}/`);
      setSelectedSurvey(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (event, questionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: event.target.value });
  };

  const handleSubmitAnswers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const surveyId = selectedSurvey.id;
      const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
        question_id: questionId,
        answer: answer
      }));
      await axios.post(`http://127.0.0.1:8000/surveys/${surveyId}/answer/`, answers);
      alert('Answers submitted successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Survey List</h1>
      {isLoading && <p>Loading surveys...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {surveys.map(survey => (
          <li key={survey.id}>
            <button onClick={() => handleSurveyClick(survey.id)}>{survey.description}</button>
          </li>
        ))}
      </ul>

      {selectedSurvey && (
        <div>
          <h2>Questions:</h2>
          {selectedSurvey.questions.map(question => (
            <div key={question.id}>
              <h3>{question.question}</h3>
              {Object.entries(question.options).map(([optionLabel, optionText]) => (
                <div key={optionLabel}>
                  <input
                    type="radio"
                    id={`option-${question.id}-${optionLabel}`}
                    name={`question-${question.id}`}
                    value={optionLabel}
                    onChange={(e) => handleAnswerChange(e, question.id)}
                  />
                  <label htmlFor={`option-${question.id}-${optionLabel}`}>{optionText}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitAnswers}>Submit Answers</button>
        </div>
      )}
    </div>
  );
};

export default SurveyList;
