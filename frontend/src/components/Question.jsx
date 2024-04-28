import RadioQuestion from './RadioQuestion.jsx'
import SliderQuestion from './AgreeQuestion.jsx'
import CheckBoxQuestion from './CheckBoxQuestion.jsx'
import TextQuestion from './TextQuestion.jsx'


function Question(props) {
  if (props.type == "radio") {
    return <><RadioQuestion answers={props.answers} question={props.question}></RadioQuestion>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }

  if (props.type == "checkbox") {
    return <><CheckBoxQuestion answers={props.answers} question={props.question}></CheckBoxQuestion>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }
  if (props.type == "agree") {
    return <><SliderQuestion answers={props.answers} question={props.question}></SliderQuestion>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }
  if (props.type == "text") {
    return <><TextQuestion question={props.question}></TextQuestion>
    </>
    // answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4}
  }

  return <li>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </li>
}

export default Question