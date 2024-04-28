import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';



export default function CheckboxLabels(props) {

    if (props.isEditable) {
        return (
            <>

                <FormGroup sx={{ width: "100%" }}>
                    <TextField id="demo-radio-buttons-group-label" value={props.question}></TextField>
                    {props.answers.map((answer) => (<FormControlLabel value={answer} key={answer} control={<Checkbox />} label={answer} />))}
                </FormGroup>
            </>
        );
    }

    return (
        <>
            <FormGroup>
                <FormLabel id="demo-radio-buttons-group-label">{props.question}</FormLabel>
                {props.answers.map((answer) => (<FormControlLabel value={answer} key={answer} control={<Checkbox />} label={answer} />))}
            </FormGroup>
        </>
    );
}