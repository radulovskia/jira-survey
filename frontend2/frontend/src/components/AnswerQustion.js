import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/questions/');
        setQuestions(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setSelectedAnswer(null); // Reset answer selection when question changes
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !selectedAnswer) {
      alert('Please select a question and answer before submitting.');
      return;
    }

    const answerData = {
      answer: {
        [selectedAnswer]: selectedQuestion.options[selectedAnswer]
      }
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/questions/${selectedQuestion.id}/answer/`,
        answerData,
        config
      );
      console.log('Answer submitted successfully:', response.data);
      // Handle successful submission (e.g., display confirmation message)
    } catch (error) {
      console.error('Error submitting answer:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Answer Questions</h1>
      {isLoading && <p>Loading questions...</p>}
      {error && <p>Error: {error}</p>}

      {questions.length > 0 ? (
        <div>
          <h2>Select a Question:</h2>
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <button onClick={() => handleQuestionSelect(question)}>
                  {question.question}
                </button>
              </li>
            ))}
          </ul>

          {selectedQuestion && (
            <div>
              <h3>Question: {selectedQuestion.question}</h3>
              {selectedQuestion.options && (
                <div>
                  <h4>Options:</h4>
                  {Object.keys(selectedQuestion.options).map((optionLabel) => (
                    <div key={optionLabel}>
                      <input
                        type="radio"
                        id={`option-${optionLabel}`}
                        value={optionLabel}
                        checked={selectedAnswer === optionLabel}
                        onChange={handleAnswerChange}
                      />
                      <label htmlFor={`option-${optionLabel}`}>
                        {optionLabel}: {selectedQuestion.options[optionLabel]}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                Submit Answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default AnswerQuestions;
