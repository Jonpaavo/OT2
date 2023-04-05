import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

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

    const [kirjauduElement, setKirjauduElement] = useState("ei kirjauduttu");
    

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

                setKirjauduElement("kirjauduttu");
            }

            if (tarkistaAdmin == true) {
                props.setAdmin(true);
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
                        <TextField data-testid="kirjaudu_input" required id="outlined-username" label="Käyttäjänimi" onChange={(e) => setInputNimi(e.target.value)} />
                        <TextField data-testid="salasana_input" required id="outlined-password" label="Salasana" type="password" onChange={(e) => setInputSalasana(e.target.value)} />
                        <Button data-testid="kirjaudu_button" variant="outlined" onClick={() => {handleKirjautuminen()}}>Kirjaudu sisään</Button>


                        {/* Tämä on testiä varten, muutetaan/poistetaan ? */}
                        <Typography>{kirjauduElement}</Typography>
                    </div>


                </Box>

            </Container>
        
        
        </>
    )
}
export {Kirjautuminen}