import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState('');

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionLabel, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionLabel] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), question: '', options: {} }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    const optionLabel = String.fromCharCode(65 + Object.keys(newQuestions[questionIndex].options).length);
    newQuestions[questionIndex].options[optionLabel] = '';
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data for the POST request
    const surveyData = {
      description,
      questions: questions.map((question) => ({
        id: question.id,
        question: question.question,
        options: question.options,
      })),
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/surveys/', surveyData, config);
      console.log('Survey created successfully:', response.data);
      // Handle successful creation (e.g., clear form, display success message)
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Survey Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <label htmlFor={`question-${index}`}>Question Text:</label>
            <input
              type="text"
              id={`question-${index}`}
              value={question.question}
              onChange={(event) => handleQuestionChange(index, event)}
            />

            <h4>Options</h4>
            {Object.keys(question.options).map((optionLabel) => (
              <div key={optionLabel}>
                <label htmlFor={`option-${index}-${optionLabel}`}>
                  Option {optionLabel}:
                </label>
                <input
                  type="text"
                  id={`option-${index}-${optionLabel}`}
                  value={question.options[optionLabel]}
                  onChange={(event) => handleOptionChange(index, optionLabel, event)}
                />
              </div>
            ))}
            <button type="button" onClick={() => addOption(index)}>
              Add Option
            </button>
            <button type="button" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <br />
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
