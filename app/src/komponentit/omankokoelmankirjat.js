import { Button,Dialog,DialogActions,DialogTitle,MenuItem,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";






const Omankokoelmankirjat = (props) => {

    const [kirjatTable,setKirjatTable] = useState([]);
    const [query,setQuery] = useState("?idomatsarjat=" + props.idOmatSarjat);
    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setjarjestysnumero] = useState(0);
    const [kirjailija,setKirjailija] = useState("");
    const [idOmatSarjat,setIdOmatSarjat] = useState(props.idOmatSarjat);
    const [kuntoluokka,setKuntoluokka] = useState(0);
    const [etuKansiKuva,setEtuKansiKuva] = useState(null);
    const [takaKansiKuva,setTakaKansiKuva] = useState(null);
    const [hankintaHinta,setHankintaHinta] = useState(0);
    const [hankintaAika,setHankintaAika] = useState("");
    const [esittelyTeksti,setEsittelyTeksti] = useState("");
    const [painovuosi,setPainovuosi] = useState(0);
    const [painos,setPainos] = useState(0);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [muokkaaKirja,setMuokkaaKirja] = useState(false);
    const [kirjaId,setKirjaId] = useState("");
    const [muokkaaNimi,setMuokkaaNimi] = useState("");
    const [muokkaaJarjestysNumero,setMuokkaaJarjestysNumero] = useState("");
    const [muokkaaKirjailija,setMuokkaaKirjailija] = useState("");
    const [muokkaaKuntoLuokka,setMuokkaaKuntoLuokka] = useState("");
    const [muokkaaHankintaHinta,setMuokkaaHankintaHinta] = useState("");
    const [muokkaaHankintaAika,setMuokkaaHankintaAika] = useState("");
    const [muokkaaEsittelyTeksti,setMuokkaaEsittelyTeksti] = useState("");
    const [muokkaaPainoVuosi,setMuokkaaPainoVuosi] = useState("");
    const [muokkaaPainos,setMuokkaaPainos] = useState("");
    const [muokkaaLaskuri,setMuokkaaLaskuri] = useState(0);
    const [poistaIidee,setPoistaIidee] = useState("");
    const [poistaLaskuri,setPoistaLaskuri] = useState(0);
    const [poistaVarmistus,setPoistaVarmistus] = useState(false);
    const [muokkaaVarmistus,setMuokkaaVarmistus] = useState(false);
    const [num,setNum] = useState(0);
    const kuntoLuokat = [
        {
            value : 0,
            label : 0
        },
        {
            value : 1,
            label : 1
        },
        {
            value : 2,
            label : 2
        },
        {
            value : 3,
            label : 3
        },
        {
            value : 4,
            label : 4
        },
        {
            value : 5,
            label : 5
        },

    ]
    

    
    

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

    },[lisaaQuery]);

    useEffect( () => {

        const Muokkaa = async () => {
            

            fetch("http://localhost:3004/omakirja/"+kirjaId, {
    

                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    nimi : muokkaaNimi,
                    jarjestysnumero : muokkaaJarjestysNumero,
                    kirjailija : muokkaaKirjailija,
                    kuntoluokka : muokkaaKuntoLuokka,
                    hankintahinta : muokkaaHankintaHinta,
                    hankintaaika : muokkaaHankintaAika,
                    esittelyteksti : muokkaaEsittelyTeksti,
                    painovuosi : muokkaaPainoVuosi,
                    painos : muokkaaPainos,
                })
            });
        }

        if (muokkaaLaskuri > 0) {

            Muokkaa();     
        }

        setMuokkaaNimi("");
        setMuokkaaJarjestysNumero("");
        setMuokkaaKirjailija("");
        setMuokkaaKuntoLuokka("");
        setMuokkaaHankintaHinta("");
        setMuokkaaHankintaAika("");
        setMuokkaaEsittelyTeksti("");
        setMuokkaaPainoVuosi("");
        setMuokkaaPainos("");

    },[muokkaaLaskuri])

    useEffect( () => {

        const poistaKirja = async () => {

            fetch("http://localhost:3004/omakirja/" + poistaIidee, {
                method : 'DELETE'
            });
        }

        if (poistaLaskuri > 0) {
            poistaKirja();
        }

        
        
    },[poistaLaskuri]);

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

    const handleMuokkaus = () => {
        muokkaaDialog()
        
    }

    const toggleMuokkaus = (id) => {
        setMuokkaaKirja(!muokkaaKirja);
        setKirjaId(id);
    }

    const poistaDialog = () => {
        setPoistaVarmistus(!poistaVarmistus);
    }

    const muokkaaDialog = () => {
        setMuokkaaVarmistus(!muokkaaVarmistus);
    }

    const peruMuokkaus = () => {
        setMuokkaaNimi("");
        setMuokkaaJarjestysNumero("");
        setMuokkaaKirjailija("");
        setMuokkaaKuntoLuokka("");
        setMuokkaaHankintaHinta("");
        setMuokkaaHankintaAika("");
        setMuokkaaEsittelyTeksti("");
        setMuokkaaPainoVuosi("");
        setMuokkaaPainos("");
    }

    const poistaKirja = () => {
        setPoistaLaskuri(poistaLaskuri + 1);
    }

    const handleJarjestysnumero = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setjarjestysnumero(e.target.value);
        }
    }

    const handleHankintaHinta = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setHankintaHinta(e.target.value);
        }
    }

    const handlePainoVuosi = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setPainovuosi(e.target.value);
        }
    }

    const handlePainos = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setPainos(e.target.value);
        }
    }


    return (

        <>
            <Container  sx={{bgcolor: "#D4EBEC", height: "100vh"}}>
                <Container>

                <Typography variant="h6" align="center">Tämä on oman kirjahyllyn kokoelman kirjat</Typography>
                <Typography variant="h6" align="center">Valitun kirjasarjan id on: {props.idOmatSarjat}</Typography>


                { !muokkaaKirja ? <div>

                    <form onSubmit={handlePost}>
                        <TextField sx={{m: 1}} required id="outlined-nimi" label="Nimi" onChange={(e) => {setKirjanNimi(e.target.value)}}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-jarjestysnumero" label="Järjestysnumero" value={jarjestysnumero} onChange={(e) => {handleJarjestysnumero(e)}}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setKirjailija(e.target.value)}></TextField>
                        <TextField sx={{m: 1}} helperText="Kuntoluokka" select defaultValue="0" required id="outlined-kuntoluokka" label="Kuntoluokka" onChange={(e) => {setKuntoluokka(e.target.value)}}>
                            {kuntoLuokat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>

                            ))}
                        </TextField>
                        <input type="file" name="takakansikuva" onChange={(e) => setTakaKansiKuva(e.target.files[0])}></input>
                        <input type="file" name="etukansikuva" onChange={(e) => setEtuKansiKuva(e.target.files[0])}></input>
                        <TextField sx={{m: 1}} required id="outlined-hankintahinta" label="Hankintahinta" value={hankintaHinta} onChange={(e) => { handleHankintaHinta(e)}}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-hankintaaika" label="Hankinta-aika" onChange={(e) => {setHankintaAika(e.target.value)}}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-esittelyteksti" label="Esittelyteksti" onChange={(e) => {setEsittelyTeksti(e.target.value)}}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-painovuosi" label="Painovuosi" value={painovuosi} onChange={(e) => handlePainoVuosi(e)}></TextField>
                        <TextField sx={{m: 1}} required id="outlined-painos" label="Painos" value={painos} onChange={(e) => handlePainos(e)}></TextField>
                        <Button sx={{mt: 2}} variant="outlined" type="submit">Lisää kirja</Button>
                    </form>


                </div> : 
                
                <div>
                    
                        <TextField required id="outlined-nimi" label="Nimi" onChange={(e) => {setMuokkaaNimi(e.target.value)}} defaultValue={muokkaaNimi}></TextField>
                        <TextField required id="outlined-jarjestysnumero" label="Järjestysnumero" onChange={(e) => setMuokkaaJarjestysNumero(e.target.value)} defaultValue={muokkaaJarjestysNumero}></TextField>
                        <TextField required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setMuokkaaKirjailija(e.target.value)} defaultValue={muokkaaKirjailija}></TextField>
                        <TextField required id="outlined-kuntoluokka" label="Kuntoluokka" onChange={(e) => {setMuokkaaKuntoLuokka(e.target.value)}} defaultValue={muokkaaKuntoLuokka}></TextField>
                        <TextField required id="outlined-hankintahinta" label="Hankintahinta" onChange={(e) => {setMuokkaaHankintaHinta(e.target.value)}} defaultValue={muokkaaHankintaHinta}></TextField>
                        <TextField required id="outlined-hankintaaika" label="Hankinta-aika" onChange={(e) => {setMuokkaaHankintaAika(e.target.value)}} defaultValue={muokkaaHankintaAika}></TextField>
                        <TextField required id="outlined-esittelyteksti" label="Esittelyteksti" onChange={(e) => {setMuokkaaEsittelyTeksti(e.target.value)}} defaultValue={muokkaaEsittelyTeksti}></TextField>
                        <TextField required id="outlined-painovuosi" label="Painovuosi" onChange={(e) => setMuokkaaPainoVuosi(e.target.value)} defaultValue={muokkaaPainoVuosi}></TextField>
                        <TextField required id="outlined-painos" label="Painos" onChange={(e) => setMuokkaaPainos(e.target.value)} defaultValue={muokkaaPainos}></TextField>
                        <Button variant="outlined" onClick={() => {toggleMuokkaus()}}>Peru muokkaus</Button>
                        <Button variant="outlined" onClick={() => {muokkaaDialog()}}>Muokkaa</Button>
                    
                </div>}

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
                            {kirjatTable.map && kirjatTable.map((row,index) =>(
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row"><NavLink to='/omakirja' onClick={() => {props.setIdOmaKirja(row.id)}} >{row.nimi}</NavLink></TableCell>
                                    <TableCell>{row.jarjestysnumero}</TableCell>
                                    <TableCell>{row.kirjailija}</TableCell>
                                    <TableCell>{row.kuntoluokka}</TableCell>
                                    <TableCell>{row.hankintahinta}</TableCell>
                                    <TableCell>{row.hankintaaika}</TableCell>
                                    <TableCell>{row.esittelyteksti}</TableCell>
                                    <TableCell>{row.painovuosi}</TableCell>
                                    <TableCell>{row.painos}</TableCell>
                                    <TableCell><Button onClick={() => {toggleMuokkaus(row.id) ; setMuokkaaNimi(row.nimi) ; setMuokkaaJarjestysNumero(row.jarjestysnumero) ; setMuokkaaKirjailija(row.kirjailija) ; setMuokkaaKuntoLuokka(row.kuntoluokka) ; setMuokkaaHankintaHinta(row.hankintahinta) ; setMuokkaaHankintaAika(row.hankintaaika) ; setMuokkaaEsittelyTeksti(row.esittelyteksti) ; setMuokkaaPainoVuosi(row.painovuosi) ; setMuokkaaPainos(row.painos)}}>Muokkaa</Button></TableCell>
                                    <TableCell><Button onClick={() => {setPoistaIidee(row.id) ; poistaDialog()}}>Poista</Button></TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={muokkaaVarmistus}>
                    <DialogTitle>Muokkaa kirjaa</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {setMuokkaaLaskuri(muokkaaLaskuri+1) ; muokkaaDialog() ; toggleMuokkaus()}}>Muokkaa</Button>
                        <Button onClick={() => {peruMuokkaus() ; muokkaaDialog() ; toggleMuokkaus() }}>Peru muokkaus</Button>
                    </DialogActions>
               </Dialog>

               <Dialog open={poistaVarmistus}>
                    <DialogTitle>Poista kirja</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {poistaKirja() ; poistaDialog()}}>Poista kirja</Button>
                        <Button onClick={() => {poistaDialog() ; setPoistaIidee("")}}>Peru poisto</Button>
                    </DialogActions>
               </Dialog>
               </Container>

                
            </Container>
        </>
    )
}

export {Omankokoelmankirjat}