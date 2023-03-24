import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";


const OmaKokoelma =(props) => {

    const [kirjaSarja,setKirjaSarja] = useState("");
    const [kustantaja,setKustantaja] = useState("");
    const [kuvaus,setKuvaus] = useState("");
    const [luokittelu,setLuokittelu] = useState("");
    const [kayttajaId,setKayttajaId] = useState(props.kayttajaId);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [query,setQuery] = useState("?kayttajaid=" + kayttajaId);

    useEffect( () => {

        const lisaaKirjaSarja = async () => {

            fetch("http://localhost:3004/omatsarjat/", {

                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    kirjasarja : kirjaSarja,
                    kustantaja : kustantaja,
                    kuvaus : kuvaus,
                    luokittelu : luokittelu,
                    kayttajaid : kayttajaId,

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

        if (kayttajaId != "")
            m.push(kayttajaId);

        setLisaaQuery(m);

        console.log("Oman sarjan lisäämisen tiedot: " + m);
    }

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/omatsarjat/" + query);

            let c = await response.json();

            setKirjaSarjaTable(c);

        }
        

        haeKirjaSarja();

    },[])

    return (
      
        <>
            <Container sx={{bgcolor: "tomato", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on oma kokoelma</Typography>

                <TextField required id="outlined-kirjasarja" label="Kirjasarja" onChange={(e) => setKirjaSarja(e.target.value)} />
                <TextField required id="outlined-kustantaja" label="Kustantaja" onChange={(e) => setKustantaja(e.target.value)} />
                <TextField required id="outlined-kuvaus" label="Kuvaus" onChange={(e) => setKuvaus(e.target.value)} />
                <TextField required id="outlined-luokittelu" label="Luokittelu" onChange={(e) => setLuokittelu(e.target.value)} />
                <Button variant="outlined" onClick={() => {handlePost()}}>Lisää kokoelma</Button>

                <TableContainer component={Paper} sx={{width: "100vh", align: "center"}}>

                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Julkaisu vuosi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            { kirjaSarjaTable.map((row) => (
                                <TableRow key={row.idomatsarjat} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        <NavLink to='/omankokoelmankirjat' onClick={() => {props.setIdOmatSarjat(row.idomatsarjat)}}>{row.kirjasarja}</NavLink>
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

  export {OmaKokoelma}