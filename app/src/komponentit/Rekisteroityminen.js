import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const Rekisteroityminen = () => {


    const [lisaaKayttajaNimi,setLisaaKayttajaNimi] = useState("");
    const [lisaaKayttajaSalasana,setLisaaKayttajaSalasana] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState("");


    useEffect( () => {

        const lisaaKayttaja = async () => {

            fetch("http://localhost:3004/kayttaja/", {

                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({

                    nimi : lisaaKayttajaNimi,
                    salasana : lisaaKayttajaSalasana
                    
                })
            });
        }

        console.log(lisaaQuery);

        if (lisaaQuery != "") {

            lisaaKayttaja();     
            
        }

        setLisaaKayttajaNimi("");
        setLisaaKayttajaSalasana("");
        
    },[lisaaQuery]);

    const handlePost = () => {

        let m  = [];

        if (lisaaKayttajaNimi != "") 
            m.push(lisaaKayttajaNimi);

        if (lisaaKayttajaSalasana != "")
            m.push(lisaaKayttajaSalasana);

        setLisaaQuery(m);
        

        console.log("Handle post m listan tiedot:" + m);

    }


    return (

        <>
            <Container maxWidth={false} sx={{bgcolor: "#D4EBEC", height: "100vh"}}>
                <Container>
                    <Container>
                    <Typography variant="h6" align="center">Tämä on rekisteröityminen</Typography>

                    <Box component="form" sx={{}} noValidate autoComplete="off">

                        <div>
                            <TextField inputProps={{ "data-testid": "rekisteröidy_input" }} required id="outlined-username" label="Käyttäjänimi" onChange={(e) => setLisaaKayttajaNimi(e.target.value)} />
                            <TextField inputProps={{ "data-testid": "rsalasana_input" }} required id="outlined-password" label="Salasana" type="password" onChange={(e) => setLisaaKayttajaSalasana(e.target.value)} />
                            <Button variant="outlined" onClick={() => {handlePost()}}>Rekisteröidy</Button>

                        </div>


                    </Box>
                </Container>
                </Container>
            </Container>
        
        
        </>

    )
}

export {Rekisteroityminen}