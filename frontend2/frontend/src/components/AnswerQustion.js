import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_backend } from './api';
import { Box, Button, Container, Divider, List, TextField } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import TemporaryDrawer from './NavigationDrawer';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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
      const response = await axios.get(`http://${api_backend.defaults.baseURL}/surveys/`);
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
      const response = await axios.get(`http://${api_backend.defaults.baseURL}/surveys/${surveyId}/`);
      setSelectedSurvey(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (event, questionId) => {
    const selectedOptionLabel = event.target.value;
    const selectedOption = selectedSurvey.questions.find(q => q.id == questionId).options[selectedOptionLabel];
    setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOption });
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
      await axios.post(`http://${api_backend.defaults.baseURL}/surveys/${surveyId}/answer/`, answers);
      // alert('Answers submitted successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);
  console.log(surveys);
  return (
    <Container>
      <TemporaryDrawer />
      <Divider />
      <br></br>

      <Typography variant="h2" gutterBottom>Survey List</Typography>
      {isLoading && <Typography variant="h4" gutterBottom>Loading surveys...</Typography>}
      {error && <Typography variant="h4" gutterBottom>Error: {error}</Typography>}

      <List >
        {surveys.map(survey => (
          <ListItem disablePadding key={survey.id} sx={{ marginBottom: "2%" }}>
            <Button size='large' variant='contained' onClick={() => handleSurveyClick(survey.id)}>{survey.description}</Button>
            <br></br>
          </ListItem>

        ))}
      </List>
      <Divider></Divider>

      {selectedSurvey && (
        <Box>
          <Typography variant="h4" gutterBottom>Questions:</Typography>
          {selectedSurvey.questions.map(question => (
            <Box key={question.id}>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><Typography variant="h5" gutterBottom>{question.question}</Typography></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >

                  {
                    Object.entries(question.options).map(([optionLabel, optionText]) => (
                      <Box sx={{ marginBottom: "1%", width: "100%" }} key={optionLabel}>

                        {/* <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name={`question-${question.id}`}
                    > */}
                        <FormControlLabel htmlFor={`option-${question.id}-${optionLabel}`} value={optionText} control={<Radio />} label={optionText} />
                        {/* <Typography sx={{ width: "10%" }} variant="subtitle1" htmlFor={`option-${question.id}-${optionLabel}`}>{optionText}</Typography>
                  <input
                    type="radio"
                    id={`option-${question.id}-${optionLabel}`}
                    name={`question-${question.id}`}
                    value={optionLabel}
                    onChange={(e) => handleAnswerChange(e, question.id)}
                  /> */}

                      </Box>

                      ///////////////////////////////////////////////////////////////////////////////
                      // <FormControl key={optionLabel} id={`option-${question.id}-${optionLabel}`}>
                      //   <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                      //   <RadioGroup
                      //     aria-labelledby="demo-radio-buttons-group-label"
                      //     defaultValue="female"
                      //     name="radio-buttons-group"
                      //   >
                      //     <FormControlLabel value={optionLabel} control={<Radio />} label={optionLabel} />
                      //   </RadioGroup>
                      // </FormControl>


                    ))
                  }

                </RadioGroup>
              </FormControl>



            </Box>
          ))}
          <br></br>
          <Button onClick={handleSubmitAnswers}>Submit Answers</Button>
        </Box>
      )
      }
    </Container >
  );
};

export default SurveyList;
