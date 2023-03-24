import { Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Omankokoelmankirjat = (props) => {

    const [kirjatTable,setKirjatTable] = useState([]);

    const [query,setQuery] = useState("?idomatsarjat=" + props.idOmatSarjat);

    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setjarjestysnumero] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [kirjailija,setKirjailija] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [painokset,setPainokset] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [idOmatSarjat,setIdOmatSarjat] = useState(props.idOmatSarjat);

    useEffect( () => {

        const haeKirjat = async () => {

            let response = await fetch("http://localhost:3004/omakirja" + query);

            let c = await response.json();

            setKirjatTable(c);

            console.log(props.idOmatSarjat);

        }

        haeKirjat();

    },[props.idOmatSarjat])

    useEffect( () => {

        const lisaaKirja = async () => {

            fetch("http://localhost:3004/omakirja", {

                method : 'POST',
                headers : {
                    'content-type' : 'application/json',
                },
                body : JSON.stringify({
                    nimi : kirjanNimi,
                    jarjestysnumero : jarjestysnumero,
                    kuvausteksti : kuvausTeksti,
                    kirjailija : kirjailija,
                    piirtajat : piirtajat,
                    ensipainovuosi : ensipainovuosi,
                    painokset : painokset,
                    idomatsarjat : idOmatSarjat
                })
            });
        }


        if (lisaaQuery != "") {
            lisaaKirja();
        }
        
        setKirjanNimi("");
        setjarjestysnumero("");
        setKuvausTeksti("");
        setKirjailija("");
        setPiirtajat("");
        setEnsipainovuosi("");
        setPainokset("");

    },[lisaaQuery])

    const handlePost = () => {

        let m = [];

        if (kirjanNimi != "")
            m.push(kirjanNimi)
        
        if (jarjestysnumero != "")
            m.push(jarjestysnumero)

        if (kuvausTeksti != "")
            m.push(kuvausTeksti)

        if (kirjailija != "")
            m.push(kirjailija)

        if (piirtajat != "")
            m.push(piirtajat);
        
        if (ensipainovuosi != "")
            m.push(ensipainovuosi)

        if (painokset != "")
            m.push(painokset)

        setLisaaQuery(m);

        console.log(m);

    }

    return (

        <>
            <Container sx={{bgcolor: "green", height: "100vh"}}>

                <Typography variant="h6" align="center">Tämä on oman kirjahyllyn kokoelman kirjat</Typography>
                <Typography variant="h6" align="center">Valitun kirjasarjan id on: {props.idOmatSarjat}</Typography>

                <TextField required id="outlined-nimi" label="Nimi" onChange={(e) => {setKirjanNimi(e.target.value)}}></TextField>
                <TextField required id="outlined-jarjestysnumero" label="Järjestysnumero" onChange={(e) => setjarjestysnumero(e.target.value)}></TextField>
                <TextField required id="outlined-kuvausteksti" label="Kuvausteksti" onChange={(e) => setKuvausTeksti(e.target.value)}></TextField>
                <TextField required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setKirjailija(e.target.value)}></TextField>
                <TextField required id="outlined-piirtajat" label="Piirtäjät" onChange={(e) => setPiirtajat(e.target.value)}></TextField>
                <TextField required id="outlined-ensipainovuosi" label="Ensipainovuosi" onChange={(e) => setEnsipainovuosi(e.target.value)}></TextField>
                <TextField required id="outlined-painokset" label="Painokset" onChange={(e) => setPainokset(e.target.value)}></TextField>
                <Button variant="outlined" onClick={() => {handlePost()}}>Lisää kirja</Button>
                

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
                                    <TableCell component="th" scope="row"><NavLink to='/omakirja' onClick={() => {props.setIdOmaKirja(row.id)}} >{row.nimi}</NavLink></TableCell>
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

export {Omankokoelmankirjat}