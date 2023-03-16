import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

const AppiBaari = () =>  {

    const [kirjautumisTokeni,setKirjautumisTokeni] = useState(false);

    const [kirjauduTeksti,setKirjauduTeksti] = useState("Kirjaudu sisään");

    const [naytaRekisteroityminen,setNaytaRekisteroityminen] = useState(true);

    useEffect (() => {

        if (kirjautumisTokeni == true) {
            setKirjauduTeksti("Kirjaudu ulos");
        }

    },[kirjautumisTokeni])

    useEffect( () => {


        if (kirjautumisTokeni == true) {

            setNaytaRekisteroityminen(false);
        }

    },[kirjautumisTokeni])


    return (

        <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Button variant="h6" href="/" >Kirja-arkisto</Button>
                    </Box>

                    { naytaRekisteroityminen &&
                        <Button variant="h6" href="rekisteroityminen">Rekisteröidy</Button>
                    }
                    
                    <Button variant="h6" href="kirjautuminen">{kirjauduTeksti}</Button>
                </Toolbar>
            </AppBar>
    )
}
export {AppiBaari}