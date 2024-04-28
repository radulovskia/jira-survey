import RadioQuestion from './RadioQuestion.jsx'
import SliderQuestion from './AgreeQuestion.jsx'
import CheckBoxQuestion from './CheckBoxQuestion.jsx'
import TextQuestion from './TextQuestion.jsx'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';


function Question(props) {

  if (props.type == "radio") {
    return <><RadioQuestion isEditable={true} answers={props.answers} question={props.question}></RadioQuestion>
      <Button sx={{ float: "right", marginTop: -5 }}><DeleteOutlineIcon /></Button>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }

  if (props.type == "checkbox") {
    return <><CheckBoxQuestion isEditable={true} answers={props.answers} question={props.question}></CheckBoxQuestion>
      <Button sx={{ float: "right", marginTop: -5 }}><DeleteOutlineIcon /></Button>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }
  if (props.type == "agree") {
    return <><SliderQuestion isEditable={true} answers={props.answers} question={props.question}></SliderQuestion>
      <Button sx={{ float: "right", marginTop: -5 }}><DeleteOutlineIcon /></Button>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }
  if (props.type == "text") {
    return <><TextQuestion isEditable={true} question={props.question}></TextQuestion>
      <Button sx={{ float: "right", marginTop: -5 }}><DeleteOutlineIcon /></Button>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }

  return <li>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </li>
}

export default Question