import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPlacement(props) {
    return (
        <FormControl>
            <FormLabel id="demo-form-control-label-placement">{props.question}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
            >
                {props.answers.map((answer) => (<FormControlLabel value={answer} control={<Radio />} labelPlacement="top"
                    label={answer} />))}
            </RadioGroup>
        </FormControl>
    );
}

