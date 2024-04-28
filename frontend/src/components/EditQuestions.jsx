import Result from "./Result.jsx";
import Question from "./QuestionEditable.jsx";
import { CORE_QUESTIONS, CORE_RESULTS } from "../data.js";
import Questions from "./QuestionsEditable.jsx";

import Divider from '@mui/material/Divider';
import { Alert, Button, Radio } from "@mui/material";
// import Button from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AbcIcon from '@mui/icons-material/Abc';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ListItem from '@mui/material/ListItem';




import FormControl from '@mui/material/FormControl';



// function placeholder(params) {
//     console.log("placeholder");
// }
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    minheight: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let nextId = 0;

export default function EditQuestions() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true); setAnswers([]) };

    const handleClose = () => setOpen(false);
    const handleAddQuestion = () => {
        console.log("CLOSED");
        handleClose();

    };

    const handleSaveEdit = () => {
        console.log("SAVEDEDIT");
    };
    // const [disableButton, setDisableButton] = React.useState(false)
    const [questionType, setQuestionType] = React.useState("Select type of question")
    const handleQuestionType = (type) => {
        console.log(type);
        setQuestionType(type);
    }



    const opinionAnswers = ['Strongly Disagree',
        'Slightly Disagree',
        'Neutral',
        'Slightly Agree',
        'Strongly Agree',]

    // const handleQuestionTypeOpinion = () => {
    //     setAnswers([])
    // }


    const [openDropdown, setOpenDropdown] = React.useState(false);

    const handleClick = () => {
        setOpenDropdown(!openDropdown);
    };
    const [answers, setAnswers] = React.useState([])

    // switch (questionType) {
    //     case "Checkbox": retrun < h1 > Checkbox < h1 />;
    //     case "Radio": retrun < h1 > Radio < h1 />;
    //     case "Opinion": retrun < h1 > Opinion < h1 />;
    //     case "Essay": retrun < h1 > Essay < h1 />;
    // }    

    return (
        <section id="core-concepts">
            {/* <h2>Questions</h2> */}
            <ol>
                {CORE_QUESTIONS.map((questionItem) => (
                    <>

                        <Question key={questionItem.title} {...questionItem} />
                        <Button sx={{ float: "right", marginTop: -5 }}><DeleteOutlineIcon /></Button>
                        <hr></hr>
                        <Divider><Button onClick={handleOpen}><AddCircleOutlineIcon /></Button></Divider>

                    </>
                ))}

            </ol>
            {/* <Questions /> */}
            <Button variant="contained" sx={{ marginLeft: "80%", marginTop: 5 }} onClick={() => handleSaveEdit()}>Save & Share</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ width: "50%", float: "left" }}>
                        <Typography id="modal-modal-title" variant="h4" >
                            Add question
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Select type of question:

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                        <HelpOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={questionType} />
                                    {openDropdown ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleQuestionType("Checkbox")}>
                                            <ListItemIcon>
                                                <CheckBoxOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Checkbox" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleQuestionType("Radio")}>
                                            <ListItemIcon>
                                                <CheckCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Radio" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleQuestionType("Opinion")(); }}>
                                            <ListItemIcon>
                                                <MoreHorizOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Opinion" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleQuestionType("Essay")}>
                                            <ListItemIcon>
                                                <AbcIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Essay" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>

                        </Typography>

                        <Button sx={{ display: "flex", marginTop: 10, }} onClick={() => handleAddQuestion()}>Add Question</Button>

                    </Box>
                    <Box sx={{ width: "50%", float: "left", paddingTop: 12 }}>
                        <div>
                            {(() => {
                                // const handleAddQuestion = () => {
                                //     let tempArr = answers;

                                //     tempArr.push("Answer");
                                //     console.log(tempArr);
                                //     setAnswers(tempArr);
                                // }

                                if (questionType == "Checkbox") {
                                    return <>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue="Question title"
                                            sx={{ width: "300px", marginBottom: "5%" }}
                                        />
                                        <Button variant="text" sx={{ paddingTop: 2 }} onClick={() => {
                                            setAnswers([
                                                ...answers,
                                                // `answer${nextId++}`
                                                { value: `answer${nextId++}`, key: `answer${nextId}`, label: `answer${nextId}`, id: `answer${nextId}` }
                                            ]); console.log(nextId);
                                        }}><AddCircleOutlineIcon /></Button>

                                        <FormGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="ts"
                                            name="radio-buttons-group"
                                        >
                                            {/* {answers.map((answer) => (<FormControlLabel value={answer.value} key={answer.key} control={<Checkbox />} label={answer.label} />))} */}
                                            {answers.map((answer) => (
                                                <ListItem key={answer.id} >
                                                    <TextField value={answer.value} key={answer.key} control={<Checkbox />} />

                                                    {/* <Button onClick={() => {
                                                        setDisableButton(!disableButton)
                                                        // EDIT ANSWER
                                                    }}><ModeEditOutlineOutlinedIcon /></Button> */}

                                                    <Button onClick={() => {
                                                        // DELETE ANSWER
                                                        setAnswers(
                                                            answers.filter(a =>
                                                                a.id !== answer.id
                                                            )
                                                        );
                                                    }}>
                                                        <DeleteOutlineIcon />
                                                    </Button>
                                                </ListItem>))}


                                        </FormGroup>
                                        {/* <Button variant="text" onClick={handleAddQuestion}><AddCircleOutlineIcon /></Button> */}


                                    </>;
                                } else if (questionType == "Radio") {
                                    return <>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue="Question title"
                                            sx={{ width: "300px", marginBottom: "5%" }}
                                        />

                                        <Button variant="text" sx={{ paddingTop: 2 }} onClick={() => {
                                            setAnswers([
                                                ...answers,
                                                // `answer${nextId++}`
                                                { value: `answer${nextId++}`, key: `answer${nextId}`, label: `answer${nextId}` }
                                            ]); console.log(nextId);
                                        }}><AddCircleOutlineIcon /></Button>

                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            {answers.map((answer) => (
                                                <ListItem key={answer.id} >
                                                    <TextField value={answer.value} key={answer.key} control={<Radio />} />

                                                    {/* <Button onClick={() => {
                                                        // EDIT ANSWER
                                                    }}><ModeEditOutlineOutlinedIcon /></Button> */}

                                                    <Button onClick={() => {
                                                        // DELETE ANSWER
                                                        setAnswers(
                                                            answers.filter(a =>
                                                                a.id !== answer.id
                                                            )
                                                        );
                                                    }}>
                                                        <DeleteOutlineIcon />
                                                    </Button>
                                                </ListItem>))}
                                        </RadioGroup>
                                        {/* <Button variant="text" onClick={handleAddQuestion}><AddCircleOutlineIcon /></Button> */}


                                    </>;
                                } else if (questionType == "Opinion") {
                                    return <>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue="Question title"
                                            sx={{ width: "300px", marginBottom: "5%" }}
                                        />

                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                        >
                                            {
                                                opinionAnswers.map((answer) => (<><FormControlLabel value={answer} control={<Radio />} labelPlacement="top" label={answer} sx={{ width: "10%", textAlign: "left", paddingTop: "10%" }} /> </>))}

                                        </RadioGroup>
                                        {/* <Button variant="text" onClick={handleAddQuestion}><AddCircleOutlineIcon /></Button> */}
                                    </>;
                                } else if (questionType == "Essay") {
                                    return <>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue="Question title"
                                            sx={{ width: "300px", marginBottom: "5%" }}
                                        />
                                        <TextField
                                            id="filled-textarea"
                                            // label="Multiline Placeholder"
                                            placeholder="Elaborate..."
                                            multiline
                                            variant="filled"
                                            sx={{ background: "#daeaff", width: "100%", textAlign: "left", }}
                                        />
                                    </>;
                                }
                            })()}
                        </div>
                    </Box>


                </Box>
            </Modal >
        </section >


    );
}
