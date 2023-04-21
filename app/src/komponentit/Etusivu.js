import { Typography, Button, Box } from "@mui/material";
import { Container } from "@mui/system";

const Etusivu = () => {
    return (
        <Container maxWidth={false}sx={{ bgcolor: "#D4EBEC", minHeight: "100vh", display: "flex" }}>

            <Box sx={{p: 5,my: "auto",mx: "auto",textAlign: "center",maxWidth: "800px",}}>
                <Typography variant="h3" align="center" gutterBottom>Tervetuloa kirja-arkisto sovellukseen!</Typography>
                <Typography variant="h6" align="left" gutterBottom>Meillä on laaja valikoima kirjoja eri genreistä, jotka odottavat sinua löytämään ne.</Typography>
                <Typography align="left" gutterBottom>Käyttöliittymämme on suunniteltu helpoksi ja intuitiiviseksi.</Typography>
                <Typography align="left" gutterBottom>Olemme ylpeitä siitä, että voimme tarjota laadukasta lukuelämystä ja auttaa sinua löytämään uusia mielenkiintoisia kirjoja.</Typography>
                <Typography align="left" gutterBottom>Käytä aikaa selaillaksesi kokoelmaamme, löytääksesi uusia suosikkeja ja luo omia kokoelmia suosikki kirjoistasi!</Typography>
                <Typography align="left" gutterBottom>Tervetuloa kirja-arkisto sovellukseen ja nauti lukemisesta!</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <Button variant="contained" color="primary" href="/kokoelma">Tutustu kokoelmaamme</Button>
                    </Box>
            </Box>
        </Container>
);
};

export { Etusivu };