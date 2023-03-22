import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const Kirjautuminen = (props) => {

    const [inputNimi,setInputNimi] = useState("");
    const [inputSalasana,setInputSalasana] = useState("");
    const [tarkistaNimi,setTarkistaNimi] = useState("");
    const [tarkistaSalasana,setTarkistaSalasana] = useState("");
    const [tarkistaAdmin,setTarkistaAdmin] = useState("");
    const [id,setId] = useState("");
    const [query,setQuery] = useState("");
    const [tiedot,setTiedot] = useState([]);
    const [laskuri,setLaskuri] = useState(0);
    

    useEffect( () => {

        const tarkistaKirjautuminen = async () => {

            console.log("TARKISTA KIRJAUTUMINEN. QUERY ON: " + query)

            let response = await fetch("http://localhost:3004/kayttaja/" + query);

            let c = await response.json();

            console.log(tiedot);

            
            c.map((item,index) => {
                setId(item.id);
                setTarkistaNimi(item.nimi);
                setTarkistaSalasana(item.salasana);
                setTarkistaAdmin(item.admin);
            });

            if (inputNimi != "" && inputNimi === tarkistaNimi && inputSalasana !="" && inputSalasana === tarkistaSalasana) {
                props.setKirjautumisToken(true);
                props.setKayttajaId(id);
                setTiedot("");
            }
        }

        if (laskuri > 0 && query != "" ) {
            tarkistaKirjautuminen();
        }
         
    },[laskuri]);

    const handleKirjautuminen = () => {

        let m = "";

        if (inputNimi != "")
            m = m +"?nimi=" + inputNimi
        
        if (inputSalasana != "")
            m = m + "&salasana=" + inputSalasana
        
        console.log(m);

        setQuery(m);

        setLaskuri(laskuri + 1);
    }

    


    return(

        <>
            <Container sx={{bgcolor: "tomato", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on Kirjautuminen</Typography>

                <Box component="form" sx={{}} noValidate autoComplete="off">

                    <div>
                        <TextField required id="outlined-username" label="Käyttäjänimi" onChange={(e) => setInputNimi(e.target.value)} />
                        <TextField required id="outlined-password" label="Salasana" type="password" onChange={(e) => setInputSalasana(e.target.value)} />
                        <Button variant="outlined" onClick={() => {handleKirjautuminen()}}>Kirjaudu sisään</Button>

                    </div>


                </Box>

            </Container>
        
        
        </>
    )
}
export {Kirjautuminen}