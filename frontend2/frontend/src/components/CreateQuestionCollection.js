import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { api_backend } from './api';
import { Box, Button, Container, Divider, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import TemporaryDrawer from './NavigationDrawer';
// import NewQuestionModal from './NewQuestionModal';

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [title, setTitle] = useState('');


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
      title,
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
      const response = await axios.post(`http://${api_backend.defaults.baseURL}/surveys/`, surveyData, config);
      console.log('Survey created successfully:', response.data);
      // Handle successful creation (e.g., clear form, display success message)
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <>
      <TemporaryDrawer />
      <Divider />
      <Container >

        <br></br>
        <Typography variant="h2" gutterBottom>Create Survey</Typography>

        <form onSubmit={handleSubmit}>

          <Typography variant="h5" gutterBottom htmlFor="title">Survey Title:</Typography>
          <TextField
            type="text"
            id="title"
            label="Title"
            value={description}
            multiline
            onChange={(event) => setDescription(event.target.value)}
            sx={{ width: "60%", marginBottom: "5%" }}
          />

          <Typography variant="h5" gutterBottom htmlFor="description">Survey Description:</Typography>
          <TextField
            type="text"
            id="description"
            label="Description"
            value={surveyDescription}
            multiline
            maxRows={15}
            minRows={5}
            onChange={(event) => setSurveyDescription(event.target.value)}
            sx={{ width: "70%", marginBottom: "5%" }}
          />
          <Typography variant="h5" gutterBottom htmlFor="questions">Questions</Typography>
          {questions.map((question, index) => (
            <div key={index}>
              {/* <Typography variant="h5" gutterBottom htmlFor="questions">Question {index + 1}</Typography> */}

              <TextField
                type="text"
                id={`title-${index}`}
                label={"Question" + (index + 1)}
                // value={title}

                onChange={(event) => setTitle(event.target.value) + handleQuestionChange(index, event)}
                sx={{ width: "60%", marginBottom: "5%" }}
              />


              {/* <label htmlFor={`question-${index}`}>Question Text:</label> */}

              <TextField
                type="text"
                id={`question-${index}`}
                label={"Question " + (index + 1) + " description"}
                // value={question.question}
                multiline
                maxRows={15}
                minRows={5}
                onChange={(event) => setQuestionDescription(event.target.value) + handleQuestionChange(index, event)}
                sx={{ width: "70%", marginBottom: "5%" }}
              />
              {/* <input
              type="text"
              id={`question-${index}`}
              value={question.question}
              onChange={(event) => handleQuestionChange(index, event)}
            /> */}

              <Typography variant="h5" gutterBottom htmlFor="questions" sx={{ marginBottom: "3%" }}>Options</Typography>
              {Object.keys(question.options).map((optionLabel) => (
                <div key={optionLabel}>
                  <Typography variant="subtitle2" htmlFor={`option-${index}-${optionLabel}`}>
                    Option {optionLabel}:
                  </Typography>
                  <TextField
                    variant='standard'
                    type="text"
                    id={`option-${index}-${optionLabel}`}
                    value={question.options[optionLabel]}
                    onChange={(event) => handleOptionChange(index, optionLabel, event)}
                    sx={{ marginBottom: "3%" }}
                  />
                </div>
              ))}
              <Button type="button" onClick={() => addOption(index)}>
                Add Option
              </Button>
              <Button type="button" onClick={() => removeQuestion(index)}>
                Remove Question
              </Button>
            </div>
          ))}

          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>
          <br />
          <Button type="submit">Create Survey</Button>
        </form>
      </Container>
    </>
  );
};

export default CreateSurvey;
