import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom";


const OmaKokoelma =(props) => {

    const [kirjaSarja,setKirjaSarja] = useState("");
    const [kustantaja,setKustantaja] = useState("");
    const [kuvaus,setKuvaus] = useState("");
    const [luokittelu,setLuokittelu] = useState("");
    const [kayttajaId,setKayttajaId] = useState(props.kayttajaId);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [query,setQuery] = useState("?kayttajaid=" + kayttajaId);
    const [muokkaaKokoelmat, setMuokkaaKokoelmat] = useState(false);
    const [muokkaaKirjaSarja,setMuokkaaKirjaSarja] = useState("");
    const [muokkaaKustantaja,setMuokkaaKustantaja] = useState("");
    const [muokkaaKuvaus,setMuokkaaKuvaus] = useState("");
    const [muokkaaLuokittelu,setMuokkaaLuokittelu] = useState("");
    const [kokoelmaId, setKokoelmaId] = useState("")
    const [laskuri, setLaskuri] = useState(0);
    const [lask, setLask] = useState(0);
   

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

    useEffect( () => {

        const Muokkaa = async () => {
            console.log("Saatu id on: ",kokoelmaId);

            fetch("http://localhost:3004/omatsarjat/"+kokoelmaId, {

                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    kirjasarja : muokkaaKirjaSarja,
                    kustantaja : muokkaaKustantaja,
                    kuvaus : muokkaaKuvaus,
                    luokittelu : muokkaaLuokittelu,
                })
            });
        }

        if (laskuri > 0 && muokkaaKirjaSarja != "" && muokkaaKustantaja != "" && muokkaaKuvaus != "" && muokkaaLuokittelu != "") {

            Muokkaa();     
        }

        setMuokkaaKirjaSarja("");
        setMuokkaaKustantaja("");
        setMuokkaaKuvaus("");
        setMuokkaaLuokittelu("");

        toggleMuokkaaKokoelma("");
        setLask(lask+1);

    },[laskuri])


    const handlePost = () => {

        let m  = [];

        if (kirjaSarja != "" && kustantaja != "" && kuvaus != "" && luokittelu != "") {
            m.push(kirjaSarja);
            m.push(kustantaja);
            m.push(kuvaus);
            m.push(luokittelu);

            setLisaaQuery(m); // työntää tiedot databaseen vain jos kaikki kentät ei tyhjiä
            console.log("Kokoelman lisäämisen tiedot: " + m);
        }
    }

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/omatsarjat/" + query);

            let c = await response.json();

            setKirjaSarjaTable(c);
            

        }
        

        haeKirjaSarja();

    },[])

    const poistaKokoelma = (id) => {
        fetch("http://localhost:3004/deleteOmatKokoelma/"+id,{

            method : 'DELETE'}).then((response)=> {
                    //setKirjaSarjaTable(kirjaSarjaTable.filter((arvo) => {return arvo.id != id}))
                    window.location.reload()
                    console.log("Poistettiin id: ",id," - Response on: ",response);
            })
    }



    const toggleMuokkaaKokoelma = (id) => {
        setMuokkaaKokoelmat(!muokkaaKokoelmat);
        setKokoelmaId(id);
        console.log(muokkaaKokoelmat)
    }

    const peruMuokkaus = () => {
        toggleMuokkaaKokoelma();
        setMuokkaaKirjaSarja("");
        setMuokkaaKustantaja("");
        setMuokkaaKuvaus("");
        setMuokkaaLuokittelu("");

    }

    const handleSubmit = () => {
        setLaskuri(laskuri+1)
    }

    

    return (
      
        <>
            <Container sx={{bgcolor: "lavender", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on oma kokoelma</Typography>
                {!muokkaaKokoelmat ? 

                    <div>
                        <Typography variant="h6" align="center">Muokkaus</Typography>
                        <TextField required id="outlined-kirjasarja" label="Kirjasarja"  defaultValue={muokkaaKirjaSarja} onChange={(e) => setMuokkaaKirjaSarja(e.target.value)} />
                            <TextField required id="outlined-kustantaja" label="Kustantaja" defaultValue={muokkaaKustantaja} onChange={(e) => setMuokkaaKustantaja(e.target.value)} />
                            <TextField required id="outlined-kuvaus" label="Kuvaus" defaultValue={muokkaaKuvaus} onChange={(e) => setMuokkaaKuvaus(e.target.value)} />
                            <TextField required id="outlined-luokittelu" label="Luokittelu" defaultValue={muokkaaLuokittelu} onChange={(e) => setMuokkaaLuokittelu(e.target.value)} />
                            <Button variant="outlined" onClick={() => {setLaskuri(laskuri + 1)}} >Muokkaa kokoelma</Button>
                            <Button variant="outlined" onClick={() => {peruMuokkaus()}}>Peru muokkaus</Button>
                    </div>
                    :
                    <div>
                        <div>
                            <TextField required id="outlined-kirjasarja" label="Kirjasarja" onChange={(e) => setKirjaSarja(e.target.value)} />
                            <TextField required id="outlined-kustantaja" label="Kustantaja" onChange={(e) => setKustantaja(e.target.value)} />
                            <TextField required id="outlined-kuvaus" label="Kuvaus" onChange={(e) => setKuvaus(e.target.value)} />
                            <TextField required id="outlined-luokittelu" label="Luokittelu" onChange={(e) => setLuokittelu(e.target.value)} />
                            <Button variant="outlined" onClick={() => {handlePost()}}>Lisää kokoelma</Button>
                        </div>
                        

                        <TableContainer component={Paper} sx={{width: "100vh", height: "65vh", align: "center"}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nimi</TableCell>
                                        <TableCell>Kuvaus {/* Oli julkaisuvuosi? Vaihdettiin olemaan kuvaus */ }</TableCell>
                                        <TableCell>{/* Namiskukkelit */}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {kirjaSarjaTable.map((row,index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell component="th" scope="row">
                                                <NavLink to ='/omankokoelmankirjat' onClick={() => props.setId(row.idomatsarjat)}>{row.kirjasarja}</NavLink>
                                            </TableCell>
                                            <TableCell>{row.kuvaus}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => {toggleMuokkaaKokoelma(row.idomatsarjat)}}>Muokkaa</Button>
                                                    <Button onClick={() => {poistaKokoelma(row.idomatsarjat)}}>Poista</Button>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    }
            </Container>
        
        
        </>
    )
  }

  export {OmaKokoelma}