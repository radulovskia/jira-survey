import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Typography } from '@mui/material';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding >
                    <Link to="/">
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <Link to="/create">
                        <ListItemButton>
                            <ListItemIcon>
                                <LibraryAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"New Survey"} />
                        </ListItemButton>
                    </Link>
                </ListItem>

                {/* <ListItem disablePadding>
                    <Link to="/all">
                        <ListItemButton>
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary={"All Questions"} />
                        </ListItemButton>
                    </Link>
                </ListItem> */}

                <ListItem disablePadding>
                    <Link to="/answer">
                        <ListItemButton>
                            <ListItemIcon>
                                <ChecklistIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Take survey"} />
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem disablePadding>
                    <Link to="/analytics">
                        <ListItemButton>
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Analytics"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Button variant='' onClick={toggleDrawer(true)} size="large" sx={{ backgroundColor: "white", color: "black" }}><MenuIcon></MenuIcon></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

            <Typography sx={{ textAlign: "center", marginTop: "-25px", marginBottom: "10px" }} variant="h5" gutterBottom>Survey Management App</Typography>
        </>
    );
}