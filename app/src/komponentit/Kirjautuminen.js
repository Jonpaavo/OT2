import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const Kirjautuminen = () => {

    const [tarkistaNimi,setTarkistaNimi] = useState("");
    const [tarkistaSalasana,setTarkistaSalasana] = useState("");
    const [query,setQuery] = useState("");
    const [tiedot,setTiedot] = useState([]);
    const [laskuri,setLaskuri] = useState(0);
    const [tarkistusLista,setTarkistusLista] = useState([]);




    useEffect( () => {

        const tarkistaKirjautuminen = async () => {

            console.log("TARKISTA KIRJAUTUMINEN")

            let response = await fetch("http://localhost:3004/kayttaja/" + query);

            let c = await response.json();

            setTiedot(c);
        }

        if (laskuri > 0) {
            tarkistaKirjautuminen();
        }

        


    },[laskuri]);



    const handleFetch = () => {

        console.log("HANDLEFETCH")

        let m = "";

        if (tarkistaNimi != "" && tarkistaSalasana !="") {
            m="?nimi=" + tarkistaNimi + "&salasana=" + tarkistaSalasana
        }
        setQuery(m)

        console.log("QUERY:" + query);

        setLaskuri(laskuri + 1);
    }

    const data = tiedot.map((item,index) => {
        
        return (
            <tr key={index}>
                <td>{item.nimi}</td>
                <td>{item.salasana}</td>
            </tr>
        )

    });
  



    return(

        <>
            <Container sx={{bgcolor: "tomato", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on Kirjautuminen</Typography>

                <Box component="form" sx={{}} noValidate autoComplete="off">

                    <div>
                        <TextField required id="outlined-username" label="Käyttäjänimi" onChange={(e) => setTarkistaNimi(e.target.value)} />
                        <TextField required id="outlined-password" label="Salasana" type="password" onChange={(e) => setTarkistaSalasana(e.target.value)} />
                        <Button variant="outlined" onClick={() => {handleFetch()}}>Kirjaudu sisään</Button>

                    </div>


                </Box>

                <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Salasana</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{data}</TableBody>

                    </Table>
            </Container>
        
        
        </>
    )
}
export {Kirjautuminen}