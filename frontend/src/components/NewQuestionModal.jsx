export default function NewQuestionModal(props) {

    return <>
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
                                <ListItemText primary={"Select type of question"} />
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

                    <Button sx={{ display: "flex", marginTop: 10, }}>Add Question</Button>

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
    </>
}