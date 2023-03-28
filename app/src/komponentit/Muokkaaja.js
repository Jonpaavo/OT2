import { AppBar, Box, Button, Toolbar, Container, Typography, useThemeProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OmaKokoelma } from "./omakokoelma";
import { Omankokoelmankirjat } from "./omankokoelmankirjat";

const Muokkaaja =(props) => {
    const [muokkausKohde, setMuokkausKohde] = useState(props.muokkausKohde);
    

    return (
      
        <>
            <Container sx={{bgcolor: "grey", height: "100vh"}}>
                <Typography variant="h6" align="center">huutista</Typography>
                <Button onClick={() => {console.log("AAAAAAA")}}>Testi</Button>
            </Container>
        
        
        </>
    )
  }

  export {Muokkaaja}