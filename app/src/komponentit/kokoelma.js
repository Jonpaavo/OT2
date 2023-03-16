import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";

const Kokoelma = (props) => {

    const [kirjatTable,setKirjatTable] = useState([]);

    const [query,setQuery] = useState("?idkirjasarja=" + props.id);


    useEffect( () => {

        const haeKirjat = async () => {

            let response = await fetch("http://localhost:3004/kirja" + query);

            let c = await response.json();

            setKirjatTable(c);

            console.log(props.id);

            

        }


        haeKirjat();

        


    },[props.id])

    

    
    return (

        <>
            <Container sx={{bgcolor: "green", height: "100vh"}}>

                <Typography variant="h6" align="center">Tämä on yhden kirjasarjan Kokoelma</Typography>
                <Typography variant="h6" align="center">Valitun kirjasarjan id on: {props.id}</Typography>

                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Järjestysnumero</TableCell>
                                <TableCell>Kuvausteksti</TableCell>
                                <TableCell>Kirjailija</TableCell>
                                <TableCell>Piirtäjä</TableCell>
                                <TableCell>Ensipainovuosi</TableCell>
                                <TableCell>Painokset</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kirjatTable.map((row) =>(
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{row.nimi}</TableCell>
                                    <TableCell>{row.jarjestysnumero}</TableCell>
                                    <TableCell>{row.kuvausteksti}</TableCell>
                                    <TableCell>{row.kirjailija}</TableCell>
                                    <TableCell>{row.piirtajat}</TableCell>
                                    <TableCell>{row.ensipainovuosi}</TableCell>
                                    <TableCell>{row.painokset}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                
            </Container>
        
        
        </>


    )
}

export {Kokoelma}