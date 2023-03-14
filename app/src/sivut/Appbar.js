import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar } from "@mui/material";

function AppiBaari() {


    return (

        <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Button variant="h6" href="#" >Kirja-arkisto</Button>
                    </Box>
                    <Button variant="h6" href="#">Rekisteröidy</Button>
                    <Button variant="h6" href="#">Kirjaudu sisään</Button>
                    
                </Toolbar>
            </AppBar>
    )
}
export {AppiBaari}