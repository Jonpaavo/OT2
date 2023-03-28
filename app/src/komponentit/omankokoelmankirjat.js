import { Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Omankokoelmankirjat = (props) => {

    const [kirjatTable,setKirjatTable] = useState([]);
    const [query,setQuery] = useState("?idomatsarjat=" + props.idOmatSarjat);
    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setjarjestysnumero] = useState("");
    const [kirjailija,setKirjailija] = useState("");
    const [idOmatSarjat,setIdOmatSarjat] = useState(props.idOmatSarjat);
    const [kuntoluokka,setKuntoluokka] = useState("");
    const [etuKansiKuva,setEtuKansiKuva] = useState(null);
    const [takaKansiKuva,setTakaKansiKuva] = useState(null);
    const [hankintaHinta,setHankintaHinta] = useState("");
    const [hankintaAika,setHankintaAika] = useState("");
    const [esittelyTeksti,setEsittelyTeksti] = useState("");
    const [painovuosi,setPainovuosi] = useState("");
    const [painos,setPainos] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState([]);
    
    
    

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

            let kirja = new FormData();

            kirja.append("nimi",kirjanNimi);
            kirja.append("jarjestysnumero",jarjestysnumero);
            kirja.append("kirjailija",kirjailija);
            kirja.append("idomatsarjat",idOmatSarjat);
            kirja.append("kuntoluokka",kuntoluokka);
            kirja.append("takakansikuva",takaKansiKuva);
            kirja.append("etukansikuva",etuKansiKuva);
            kirja.append("hankintahinta",hankintaHinta);
            kirja.append("hankintaaika",hankintaAika);
            kirja.append("esittelyteksti",esittelyTeksti);
            kirja.append("painovuosi",painovuosi);
            kirja.append("painos",painos);

            fetch("http://localhost:3004/omakirja", {
                method : 'POST',
                body : kirja,
            });
        }


        if (lisaaQuery != "") {
            lisaaKirja();
        }

        setKirjanNimi("");
        setjarjestysnumero("");
        setKirjailija("");
        setKuntoluokka("");
        setTakaKansiKuva(null);
        setEtuKansiKuva(null);
        setHankintaHinta("");
        setHankintaAika("");
        setEsittelyTeksti("");
        setPainovuosi("");
        setPainos("");

    },[lisaaQuery])

    const handlePost = () => {

        let m = [];

        if (kirjanNimi != "")
            m.push(kirjanNimi)
        
        if (jarjestysnumero != "")
            m.push(jarjestysnumero)

        if (kirjailija != "")
            m.push(kirjailija)

        setLisaaQuery(m);

        console.log("Terve")
    }



    return (

        <>
            <Container sx={{bgcolor: "green", height: "100vh"}}>

                <Typography variant="h6" align="center">Tämä on oman kirjahyllyn kokoelman kirjat</Typography>
                <Typography variant="h6" align="center">Valitun kirjasarjan id on: {props.idOmatSarjat}</Typography>

                <form onSubmit={handlePost}>
                    <TextField required id="outlined-nimi" label="Nimi" onChange={(e) => {setKirjanNimi(e.target.value)}}></TextField>
                    <TextField required id="outlined-jarjestysnumero" label="Järjestysnumero" onChange={(e) => setjarjestysnumero(e.target.value)}></TextField>
                    <TextField required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setKirjailija(e.target.value)}></TextField>
                    <TextField required id="outlined-kuntoluokka" label="Kuntoluokka" onChange={(e) => {setKuntoluokka(e.target.value)}}></TextField>
                    <input type="file" name="takakansikuva" onChange={(e) => setTakaKansiKuva(e.target.files[0])}></input>
                    <input type="file" name="etukansikuva" onChange={(e) => setEtuKansiKuva(e.target.files[0])}></input>
                    <TextField required id="outlined-hankintahinta" label="Hankintahinta" onChange={(e) => {setHankintaHinta(e.target.value)}}></TextField>
                    <TextField required id="outlined-hankintaaika" label="Hankinta-aika" onChange={(e) => {setHankintaAika(e.target.value)}}></TextField>
                    <TextField required id="outlined-esittelyteksti" label="Esittelyteksti" onChange={(e) => {setEsittelyTeksti(e.target.value)}}></TextField>
                    <TextField required id="outlined-painovuosi" label="painovuosi" onChange={(e) => setPainovuosi(e.target.value)}></TextField>
                    <TextField required id="outlined-painos" label="Painos" onChange={(e) => setPainos(e.target.value)}></TextField>
                    <Button variant="outlined" type="submit">Lisää kirja</Button>
                </form>
                
                

                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Järjestysnumero</TableCell>
                                <TableCell>Kirjailija</TableCell>
                                <TableCell>Kuntoluokka</TableCell>
                                <TableCell>Hankintahinta</TableCell>
                                <TableCell>Hankinta-aika</TableCell>
                                <TableCell>Esittelyteksti</TableCell>
                                <TableCell>Painovuosi</TableCell>
                                <TableCell>Painos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kirjatTable.map((row) =>(
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row"><NavLink to='/omakirja' onClick={() => {props.setIdOmaKirja(row.id)}} >{row.nimi}</NavLink></TableCell>
                                    <TableCell>{row.jarjestysnumero}</TableCell>
                                    <TableCell>{row.kirjailija}</TableCell>
                                    <TableCell>{row.kuntoluokka}</TableCell>
                                    <TableCell>{row.hankintahinta}</TableCell>
                                    <TableCell>{row.hankintaaika}</TableCell>
                                    <TableCell>{row.esittelyteksti}</TableCell>
                                    <TableCell>{row.painovuosi}</TableCell>
                                    <TableCell>{row.painos}</TableCell>
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