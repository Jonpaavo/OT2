import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Tietoa = (props) => {


    return (
        <>
            <Container maxWidth={false} sx={{bgcolor: "#D4EBEC", height: "100vh"}}> 
                <Container sx={{p:5}}>
                    <Typography variant="h6" align="left">Tervetuloa TestoSonnit Oy:n kirja-arkisto tietoja sivulle!</Typography>
                    <Typography align="left">Tältä sivulta löydät yleistä tietoa luomastamme projektista.</Typography>
                    <Typography align="left">Kirja-arkisto sovelluksella voit luoda omia kokoelmia ja muokata niitä.</Typography>
                    <Typography align="left">Rekisteröityminen ja kirjautuminen on pakollista, jos haluat luoda tai muokata omia kokoelmia.</Typography>
                    <Typography align="left">Mahdolliset ilmoitukset ongelmista voi lähettää Scrum Masterille sähköpostitse.</Typography>
                </Container>
                <Container sx={{p:5}}>
                    <Typography variant="h6" align="left">TestoSonnit Oy:n jäsenet</Typography>
                    <Typography align="left">Jonni Paavola</Typography>
                    <Typography align="left">Olli Tanninen</Typography>
                    <Typography align="left">Taneli Saarenkunnas</Typography>
                    <Typography align="left">Topias Pohjola</Typography>
                </Container>
                <Container sx={{p:5}}>
                    <Typography variant="h6" align="left">Yhteystiedot</Typography>
                    <Typography align="left">Yhteydenotot sähköpostitse osoitteeseen: ScrumMaster@hotmail.com</Typography>
                    <Typography align="left">Yhteydenotot puhelimitse numeroon: 04542071551</Typography>
                    <Typography align="left">Osoite: Microkatu 1</Typography>
                </Container>
            </Container>


        
        
        </>
    )
}
export {Tietoa}