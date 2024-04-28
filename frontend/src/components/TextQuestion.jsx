import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function TextQuestion(props) {
    const inputProps = {
        background: "#daeaff",
    }

    if (props.isEditable) {
        return (
            <FormControl sx={{ width: "100%" }}>
                <TextField id="demo-radio-buttons-group-label" value={props.question}>{props.question}</TextField>
                <TextField
                    inputProps={inputProps}
                    id="filled-textarea"
                    // label="Multiline Placeholder"
                    placeholder="Elaborate..."
                    multiline
                    variant="filled"
                    sx={{ background: "#daeaff", width: "90%" }}
                />
            </FormControl>
        );
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{props.question}</FormLabel>
            <TextField
                inputProps={inputProps}
                id="filled-textarea"
                // label="Multiline Placeholder"
                placeholder="Elaborate..."
                multiline
                variant="filled"
                sx={{ background: "#daeaff", width: "90%" }}
            />
        </FormControl>
    );
}