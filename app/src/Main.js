import { useEffect, useInsertionEffect, useState } from "react";
import {Typography,AppBar,CssBaseline,Toolbar,Container,Box,Link,Button,List,
     ListItem, ListItemButton, ListItemText, Grid, TableHead,Table, TableBody, TextField, Dialog,DialogActions,DialogContent,DialogContentText,
    DialogTitle} from '@mui/material';


const Kokeilu = () => {

    //Kirjan hakujutut
    const [haeQuery,setHaeQuery] = useState("");
    const [tableTiedot,setTableTiedot] = useState([]);
    const [haeNimi,setHaeNimi] = useState("");
    const [haeJarjestysnumero,setHaeJarjestysnumero] = useState("");
    const [haeKuvausteksti,setHaeKuvausteksti] = useState("");
    const [haeKirjailija,setHaeKirjailija] = useState("");
    const [haePiirtajat,setHaePiirtajat] = useState("");
    const [haeEnsipainovuosi,setHaeEnsipainovuosi] = useState("");
    const [haePainokset,setHaePainokset] = useState("");
    const [laskuri,setLaskuri] = useState(0);

    //Kirjasarjan hakujutut
    const [haeKirjaSarja,setHaeKirjaSarja] = useState("");
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [kirjaSarjaLaskuri,setKirjaSarjaLaskuri] = useState(0);
    
    //Hookit
    const [naytaTable,setNaytaTable] = useState(false);
    const [naytaEtusivu,setNaytaEtusivu] = useState(false);
    const [naytaTiedot,setNaytaTiedot] = useState(false);
    const [naytaKokoelmat,setNaytaKokoelmat] = useState(false);
    const [naytaKirjaKokoelma,setNaytaKirjaKokoelma] = useState(false);

    //Kirjautumis jutut
    const [kirjaudu,setKirjaudu] = useState(false);

    //Rekisteröitymis jutut
    const [rekisteroidy,setRekisteroidy] = useState(false);


    
    const handleKirjautuminen = () => {
        setKirjaudu(true);
    };

    const handleUlosKirjautuminen = () => {
        setKirjaudu(false);
    }

    const handleRekisteroityminen = () => {
        setRekisteroidy(true);
    };

    const handleUlosRekisteroityminen = () => {
        setRekisteroidy(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/kirjasarja");

            let c = await response.json();

            setKirjaSarjaTable(c);

            
        }

        if (kirjaSarjaLaskuri > 0) {
            haeKirjaSarja();
        }

    },[kirjaSarjaLaskuri]);


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/kirja" + haeQuery);

            let c = await response.json();

            setTableTiedot(c);


        }

        if (laskuri > 0) {

            haeTiedot();
        }

    },[laskuri]);


    const handleFetch = () => {

        let m = "";

        if (haeNimi == "" && haeJarjestysnumero && haeKuvausteksti && haeKirjailija && haePiirtajat && haeEnsipainovuosi && haePainokset) {
            m = ""
        }

        else if (haeNimi != "") {
            m = "?nimi=" + haeNimi;
        }

        setHaeQuery(m);

        setLaskuri(laskuri + 1);
    }

    const handleKokoelmaFetch = () => {

        setKirjaSarjaLaskuri(kirjaSarjaLaskuri + 1);
    }


    const data = tableTiedot.map( (item,index) => {
        return (
            <tr key={index}>
                <td>{item.nimi}</td>
                <td>{item.jarjestysnumero}</td>
                <td>{item.kuvausteksti}</td>
                <td>{item.kirjailija}</td>
                <td>{item.piirtajat}</td>
                <td>{item.ensipainovuosi}</td>
                <td>{item.painokset}</td>
            </tr>
        );
    });

    const kokoelmaData = kirjaSarjaTable.map( (item,index) => {

        return (

            <tr key={index}>
                <td><Link href="#" color="inherit" onClick={() => {setNaytaKokoelmat(false) ; setNaytaKirjaKokoelma(prev => !prev)}}>{item.kirjasarja}</Link></td>
            </tr>
        );

    });


    return (

        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Button variant="h6" href="#" component={Link} >Kirja-arkisto</Button>
                    </Box>
                    <Button variant="h6" href="#" component={Link} onClick={handleRekisteroityminen} >Rekisteröidy</Button>
                    <Button variant="h6" href="#" component={Link} onClick={handleKirjautuminen} >Kirjaudu sisään</Button>
                    
                    <Dialog open={kirjaudu} onClose={handleUlosKirjautuminen}>
                        <DialogTitle>Kirjaudu sisään</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ole hyvä ja kirjaudu sisään
                            </DialogContentText>
                            <TextField
                             autoFocus
                             margin="dense"
                             id="name"
                             label="Käyttäjänimi"
                             type="username"
                             fullWidth
                             variant="standard">
                            </TextField>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Salasana"
                            type="password"
                            fullWidth
                            variant="standard">
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUlosKirjautuminen}>Poistu</Button>
                            <Button onClick={handleUlosKirjautuminen}>Kirjaudu</Button>
                        </DialogActions>

                    </Dialog>

                    <Dialog open={rekisteroidy} onClose={handleUlosRekisteroityminen}>
                        <DialogTitle>Rekisteröidy</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Ole hyvä ja Rekisteröidy
                            </DialogContentText>
                            <TextField
                             autoFocus
                             margin="dense"
                             id="name"
                             label="Käyttäjänimi"
                             type="username"
                             fullWidth
                             variant="standard">
                            </TextField>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Salasana"
                            type="password"
                            fullWidth
                            variant="standard">
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUlosRekisteroityminen}>Poistu</Button>
                            <Button onClick={handleUlosRekisteroityminen}>Rekisteröidy</Button>
                        </DialogActions>

                    </Dialog>
                </Toolbar>
            </AppBar>

            <Grid container>
                <Grid item xs={6} md={3} lg={2} >
                    <Box >

                        <List sx={{ width: 150, background: ""}}>
                            <ListItem onClick={() => {setNaytaTiedot(prev => !prev) ; setNaytaEtusivu(false) ; setNaytaTable(false) ; setNaytaKokoelmat(false)}}>
                                <ListItemButton>
                                    <ListItemText primary="Tietoa"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem onClick={() => {setNaytaEtusivu(prev => !prev) ; setNaytaTable(false) ; setNaytaTiedot(false) ; setNaytaKokoelmat(false)}}>
                                <ListItemButton>
                                    <ListItemText primary="Etusivu"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem onClick={() => {setNaytaTable(prev => !prev); handleFetch() ; setNaytaEtusivu(false) ; setNaytaTiedot(false) ; setNaytaKokoelmat(false)}}>
                                <ListItemButton>
                                    <ListItemText primary="Kirjat"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem onClick={() => {setNaytaKokoelmat(prev => !prev) ; setNaytaTiedot(false) ; setNaytaEtusivu(false) ; setNaytaTable(false) ; handleKokoelmaFetch()}}>
                                <ListItemButton>
                                    <ListItemText primary="Kokoelmat"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>

                    </Box>
                </Grid>
                
                <Grid item xs={6} md={9} lg={9}>

                    { naytaTiedot && <Container sx={{bgcolor: "violet", height: "100vh"}}>

                        <Typography variant="h6" align="center">Tämä on tiedot</Typography>



                    </Container>}

                    { naytaEtusivu && <Container sx={{bgcolor: "blue", height: "100vh"}}>
                        
                        <Typography variant="h6" align="center">Tämä on etusivu</Typography>
                        
                        
                        
                    </Container>}


                    
                    { naytaTable && <Container sx={{bgcolor: "tomato", height: "100vh"}}>

                        <Typography variant="subtitle1" align="center">Kaikki kirjat</Typography>

                        
                        <Table>
                            <TableHead>Nimi</TableHead>
                            <TableBody>{data}</TableBody>
                        </Table>
                        

                    </Container>}

                    { naytaKokoelmat && <Container sx={{bgcolor: "green", height: "100vh"}}>

                        <Typography variant="h6" align="center">Kokoelmat</Typography>

                        <Table>
                            <TableHead>Nimi</TableHead>
                            <TableBody>{kokoelmaData}</TableBody>
                        </Table>

                    </Container>}

                    { naytaKirjaKokoelma && <Container sx={{bgcolor: "Brown", height: "100vh"}}>

                        <Typography variant="h6" align="center">Yhden kirjan kokoelma</Typography>

                    </Container>}

                    

                </Grid>

            </Grid>


        </>
    )
}

export {Kokeilu}