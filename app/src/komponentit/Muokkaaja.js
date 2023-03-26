import { AppBar, Box, Button, Toolbar, Container, Typography, useThemeProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OmaKokoelma } from "./omakokoelma";
import { Omankokoelmankirjat } from "./omankokoelmankirjat";

const Muokkaaja =(props) => {
    const {muokkausKohde} = props;
    
    
    

    useEffect( () => {
        if (muokkausKohde === "omakokoelma"){
        console.log("haloo")
        } else if (muokkausKohde === "omankokoelmankirjat") {
       console.log("böö")
        }
    },[muokkausKohde])

    return (
      
        <>
            <Container sx={{bgcolor: "grey", height: "100vh"}}>
                <Typography variant="h6" align="center">huutista</Typography>
            </Container>
        
        
        </>
    )
  }

  export {Muokkaaja}