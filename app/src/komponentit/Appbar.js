import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar } from "@mui/material";
import { useState } from "react";

function AppiBaari() {

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

    return (

        <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Button variant="h6" href="/" >Kirja-arkisto</Button>
                    </Box>
                    <Button variant="h6" href="#" onClick={() => {handleRekisteroityminen()}}>Rekisteröidy</Button>
                    <Button variant="h6" href="#" onClick={() => {handleKirjautuminen()}}>Kirjaudu sisään</Button>

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
    )
}
export {AppiBaari}