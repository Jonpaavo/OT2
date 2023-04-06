import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import {Link} from 'react-router-dom'


const Valikko = (props) => {


    
    

    return (
        <>

            

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
                                <Link to ={'/kokoelmat'} onClick={() => props.setLaskuri(props.laskuri + 1 )}>Kokoelmat</Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    { props.kirjautumisToken && <ListItem>
                        <ListItemButton>
                            <ListItemText>
                                <Link to ={'/omakokoelma'} onClick={() => props.setLaskuri(props.laskuri + 1 )}>Oma kokoelma</Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>}
                </List>

            </Drawer>
        
        </>
        
    )
}
export {Valikko}