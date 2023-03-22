import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Kokoelmat = (props) => {

    //Kirjasarjan hakujutut
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState(() => {

        const saved = localStorage.getItem("kokoelmat");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/kirjasarja");

            let c = await response.json();

            setKirjaSarjaTable(c);
        }

        
        haeKirjaSarja();
            
    },[]);

    
    useEffect ( () => {

        window.localStorage.setItem('kokoelmat', JSON.stringify(kirjaSarjaTable));

    },[kirjaSarjaTable])


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