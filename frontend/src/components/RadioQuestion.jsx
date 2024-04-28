import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup(props) {

    if (props.isEditable) {
        return (
            <FormControl sx={{ width: "100%" }}>
                <TextField value={props.question} id="demo-radio-buttons-group-label" >{props.question}</TextField>

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {props.answers.map((answer) => (<FormControlLabel value={answer} key={answer} control={<Radio />} label={answer} />))}
                </RadioGroup>

            </FormControl>
        );
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{props.question}</FormLabel>

            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {props.answers.map((answer) => (<FormControlLabel value={answer} key={answer} control={<Radio />} label={answer} />))}
            </RadioGroup>

        </FormControl>
    );


}