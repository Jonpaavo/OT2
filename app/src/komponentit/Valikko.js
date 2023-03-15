import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import {Link} from 'react-router-dom'

function Valikko() {

    return (


        <Drawer variant="permanent">
            
            <List sx={{ width: 150, background: ""}}>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Link to={'/tietoa'}>Tietoa</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Link to={'/'}>Etusivu</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Link to={'/kirjat'}>Kirjat</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Link to={'/kokoelmat'}>Kokoelmat</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

        </Drawer>
    )
}
export {Valikko}