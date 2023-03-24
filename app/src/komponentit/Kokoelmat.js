import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Kokoelmat = (props) => {

    //Kirjasarjan hakujutut
    

    const [kirjaSarja,setKirjaSarja] = useState("");
    const [kustantaja,setKustantaja] = useState("");
    const [kuvaus,setKuvaus] = useState("");
    const [luokittelu,setLuokittelu] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([props.kirjaSarjaTable]);

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/kirjasarja");

            let c = await response.json();

            props.setKirjaSarjaTable(c);
        }

        if (kirjaSarjaTable != "") {
            haeKirjaSarja();
        }
        
            
    },[kirjaSarjaTable]);


    useEffect( () => {

        const lisaaKirjaSarja = async () => {

            fetch("http://localhost:3004/kirjasarja/", {

                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    kirjasarja : kirjaSarja,
                    kustantaja : kustantaja,
                    kuvaus : kuvaus,
                    luokittelu : luokittelu,
                })
            });
        }

        if (lisaaQuery != "") {

            lisaaKirjaSarja();     
        }

        setKirjaSarja("");
        setKustantaja("");
        setKuvaus("");
        setLuokittelu("");

    },[lisaaQuery])

    const handlePost = () => {

        let m  = [];

        if (kirjaSarja != "") 
            m.push(kirjaSarja);

        if (kustantaja != "")
            m.push(kustantaja);

        if (kuvaus != "") 
            m.push(kuvaus);

        if (luokittelu != "")
            m.push(luokittelu);

        setLisaaQuery(m);

        console.log("Kokoelman lisäämisen tiedot: " + m);

    }


    return (

        <>

            <Container sx={{bgcolor: "green", height: "100vh"}}>

                <Typography variant="h6" align="center">Tämä on Kokoelmat</Typography>

                <Typography variant="h6" align="center">Tämä on yhden kirjasarjan Kokoelma</Typography>
                <Typography variant="h6" align="center">Valitun kirjasarjan id on: {props.id}</Typography>

                { props.admin == true &&
                    <div>
                        <TextField required id="outlined-kirjasarja" label="Kirjasarja" onChange={(e) => setKirjaSarja(e.target.value)} />
                        <TextField required id="outlined-kustantaja" label="Kustantaja" onChange={(e) => setKustantaja(e.target.value)} />
                        <TextField required id="outlined-kuvaus" label="Kuvaus" onChange={(e) => setKuvaus(e.target.value)} />
                        <TextField required id="outlined-luokittelu" label="Luokittelu" onChange={(e) => setLuokittelu(e.target.value)} />
                        <Button variant="outlined" onClick={() => {handlePost()}}>Lisää kokoelma</Button>
                    </div>
                }
                

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