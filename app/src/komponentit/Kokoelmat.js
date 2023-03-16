import { Box, Link, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Kokoelma } from "./kokoelma";




const Kokoelmat = (props) => {

    //Kirjasarjan hakujutut
    const [haeKirjaSarja,setHaeKirjaSarja] = useState("");
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [naky,setNaky] = useState(false);
    
    
    

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/kirjasarja");

            let c = await response.json();

            setKirjaSarjaTable(c);

            

        }

        
        
        

        if (props.laskuri > 0) {
            haeKirjaSarja();
            console.log(props.laskuri);
        }
        
        
        
        
        

    },[props.laskuri]);

    

    


    return (

        <>
            
            

            <Container sx={{bgcolor: "green", height: "100vh"}}>

                <Typography variant="h6" align="center">Tämä on Kokoelmat</Typography>

                

                <TableContainer component={Paper} sx={{width: "100vh", align: "center"}}>

                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Julkaisu vuosi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kirjaSarjaTable.map((row) => (
                                <TableRow key={row.idkirjasarja} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        <NavLink to ='/kokoelma' onClick={() => props.setId(row.idkirjasarja)}>{row.kirjasarja}</NavLink>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        
        
        </>


    )
}

export {Kokoelmat}