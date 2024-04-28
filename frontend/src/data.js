import componentsImg from './assets/components.png';
import propsImg from './assets/config.png';
import jsxImg from './assets/jsx-ui.png';
import stateImg from './assets/state-mgmt.png';
export const CORE_QUESTIONS = [

  {
    // image: componentsImg,
    type: 'radio',
    title: 'Question 1',
    answers:
      [
        // answer1: 'Yes',
        // answer2: 'No',
        // answer3: 'Maybe',
        // answer4: 'Sure'
        'True',
        'False',

      ]
    ,
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },
  {
    // image: componentsImg,
    type: 'radio',
    title: 'Question 2',
    answers:
      [
        // answer1: 'Yes',
        // answer2: 'No',
        // answer3: 'Maybe',
        // answer4: 'Sure'
        'Option A',
        'Option B',
        'Option C',
        'Option D',
      ]
    ,
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },

  {
    // image: componentsImg,
    type: 'checkbox',
    title: 'Question 3',
    answers:
      [
        // answer1: 'Yes',
        // answer2: 'No',
        // answer3: 'Maybe',
        // answer4: 'Sure'
        'Option A',
        'Option B',
        'Option C',
        'Option D',
      ]
    ,
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },


  {
    // image: componentsImg,
    type: 'agree',
    title: 'Question 4',
    answers:
      [
        'Strongly Disagree',
        'Slightly Disagree',
        'Neutral',
        'Slightly Agree',
        'Strongly Agree',
      ]
    ,
    question:
      'How do you feel about this? ',
  },

  {
    // image: componentsImg,
    type: 'text',
    title: 'Question 5',
    answer: '',
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio?  ',
  },
];


export const CORE_RESULTS = [

  {
    // image: componentsImg,
    title: 'Question 1',
    answers:
      [
        'True',
        'False',
      ]
    ,

    answersNum: [
      128,
      256,
    ],

    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },
  {
    // image: componentsImg,
    title: 'Question 2',
    answers:
      [
        'A',
        'B',
        'C',
        'D',
      ]
    ,

    answersNum: [
      32,
      192,
      54,
      106,
    ],

    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },
  {
    // image: componentsImg,
    title: 'Question 3',
    answers:
      [
        'A',
        'B',
        'C',
        'D',
      ]
    ,

    answersNum: [
      307,
      192,
      69,
      240,
    ],

    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },
  {
    title: 'Question 4',
    answers:
      [
        'A',
        'B',
        'C',
        'D',
      ]
    ,

    answersNum: [
      307,
      192,
      69,
      240,
    ],

    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio? ',
  },

];

// export const EXAMPLES = {
//   components: {
//     title: 'Components',
//     description:
//       'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
//     code: `
// function Welcome() {
//   return <h1>Hello, World!</h1>;
// }`,
//   },
//   jsx: {
//     title: 'JSX',
//     description:
//       'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
//     code: `
// <div>
//   <h1>Welcome {userName}</h1>
//   <p>Time to learn React!</p>
// </div>`,
//   },
//   props: {
//     title: 'Props',
//     description:
//       'Components accept arbitrary inputs called props. They are like function arguments.',
//     code: `
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }`,
//   },
//   state: {
//     title: 'State',
//     description:
//       'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
//     code: `
// function Counter() {
//   const [isVisible, setIsVisible] = useState(false);

//   function handleClick() {
//     setIsVisible(true);
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>Show Details</button>
//       {isVisible && <p>Amazing details!</p>}
//     </div>
//   );
// }`,
//   },
// };