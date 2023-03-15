import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";

const Kokoelmat = () => {

    //Kirjasarjan hakujutut
    const [haeKirjaSarja,setHaeKirjaSarja] = useState("");
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [kirjaSarjaLaskuri,setKirjaSarjaLaskuri] = useState(0);

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/kirjasarja");

            let c = await response.json();

            setKirjaSarjaTable(c);

            
        }

        
        haeKirjaSarja();
        

    });

    

    const kokoelmaData = kirjaSarjaTable.map( (item,index) => {

        return (

            <tr key={index}>
                <td>{item.kirjasarja}</td>
            </tr>
        );

    });





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
                        <TableBody>{kokoelmaData}</TableBody>

                    </Table>


                </TableContainer>
                

            </Container>
        
        
        </>


    )
}

export {Kokoelmat}