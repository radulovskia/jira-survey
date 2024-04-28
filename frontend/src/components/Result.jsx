
import RadioQuestion from './RadioQuestion.jsx'
import SliderQuestion from './AgreeQuestion.jsx'
import CheckBoxQuestion from './CheckBoxQuestion.jsx'
import TextQuestion from './TextQuestion.jsx'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';

import { BarChart } from '@mui/x-charts/BarChart';
export default function Result(props) {
  // return <>

  //   <RadioQuestion answers={props.answers} question={props.question}></RadioQuestion>
  //   <hr />

  // </>

  const chartSetting = {
    // width: 500,
    height: 400,
    colors: "#2584ff",
  };

  let totalNumbOfAnswers = 0;
  for (let i = 0; i < props.answersNum.length; i++) {
    totalNumbOfAnswers += props.answersNum[i];
  }

  // props.answersNum

  console.log(props.answersNum);
  console.log(totalNumbOfAnswers);
  return (
    <>
      <h1>{props.title}</h1>
      <FormLabel id="demo-radio-buttons-group-label">{props.question}</FormLabel>
      <BarChart
        // leftAxis={null}
        // bottomAxis={null}
        // yAxis={[{ scaleType: 'band', data: [props.answers], dataKey: 'answersNum' }]}
        // xAxis={[]}
        // series={[{ dataKey: props.answersNum }]}
        // series={[{ data: [1, 2, 3, 2, 1] }]}
        // xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }]}
        // layout="horizontal"
        {...chartSetting}
        series={[{ data: props.answersNum, color: "#2584ff" }]}
        yAxis={[{ scaleType: 'band', data: props.answers, ChartsText: props.answersNum }]}
        height={200}
        width={600}
        bottomAxis={null}
        layout="horizontal"

        options={{
          plugins: {
            datalabels: {
              display: true, // Ensure that the data labels are enabled
              // color: 'black', // Color of the label text
              anchor: 'end', // Positioning of the label relative to the bar
              align: 'end', // Alignment of the label text

              formatter: (value, context) => {
                // const index = context.dataIndex;
                // const total = props.answersNum.reduce((acc, cur) => acc + cur, 0);
                // const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
                return props.answersNum
                // return percentage + '%'; // Display percentage with percentage sign
              }
            }
          }
        }}
      />

    </>
  );
}