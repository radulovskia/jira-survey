import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const fetchQuestions = async () => {
    const response = await api.get("/questions");
    setQuestions(response.data)
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/questions', formData);
    fetchQuestions();
    setFormData({
      question: '',
      answer: '',
    });
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Survey App
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='question' className='form-label'>
              Question
            </label>
            <input type='text' className='form-control' id='question' name='question' onChange={handleInputChange} value={formData.question}/>
          </div>
          <div className='mb-3 mt-3'>
            <label htmlFor='answer' className='form-label'>
              Answer
            </label>
            <input type='text' className='form-control' id='answer' name='answer' onChange={handleInputChange} value={formData.answer}/>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
        <br></br>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
