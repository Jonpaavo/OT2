import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

const AppiBaari = (props) =>  {

    const [naytaRekisteroityminen,setNaytaRekisteroityminen] = useState(true);

    useEffect( () => {


        if (props.kirjautumisToken == true) {

            setNaytaRekisteroityminen(false);
        }

    },[props.kirjautumisToken])

    const handleKirjautumisToken = () => {

        props.setKirjautumisToken(false);
    }
    return (

        <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Button variant="h6" href="/" >Kirja-arkisto</Button>
                    </Box>

                    { naytaRekisteroityminen &&
                        <Button variant="h6" href="rekisteroityminen">Rekisteröidy</Button>
                    }
                    
                    {props.kirjautumisToken == false  &&
                        <Button variant="h6" href="kirjautuminen">Kirjaudu sisään</Button>
                    }

                    { props.kirjautumisToken == true  &&
                        <Button variant="h6" href="kirjautuminen" onClick={() => {handleKirjautumisToken()}}>Kirjaudu ulos</Button>

                    }
                </Toolbar>
            </AppBar>
    )
}
export {AppiBaari}