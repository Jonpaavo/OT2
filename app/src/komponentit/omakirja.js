import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OmaKirja = (props) => {

    const [kirjanNimi,setKirjanNimi] = useState("");
    const [kirjailijat,setKirjailijat] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [painokset,setPainokset] = useState("");
    const [query,setQuery] = useState("?id=" + props.idOmaKirja);
    const [id,setId] = useState("");


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/omakirja" + query);

            let c = await response.json();

            

            c.map((item,index) => {

                setId(item.id);
                setKirjanNimi(item.nimi);
                setKirjailijat(item.kirjailija);
                setPiirtajat(item.piirtajat);
                setEnsipainovuosi(item.ensipainovuosi);
                setKuvausTeksti(item.kuvausteksti);
                setPainokset(item.painokset);
            });

        }


        haeTiedot();

    },[props.idOmaKirja])

    return (

        <>
            <Container sx={{bgcolor: "brown", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on yhden kirjan sivu</Typography>
                <Typography variant="h6" align="center">Tämä on klikatun kirjan id: {id}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan nimi: {kirjanNimi}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kirjailijat: {kirjailijat}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan piirtäjät: {piirtajat}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan ensipainovuosi: {ensipainovuosi}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kuvausteksti: {kuvausTeksti}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan painokset: {painokset}</Typography>

                <img src="./kuvat/pepe.jpg" height={200} width={200} />
            </Container>
        
        
        </>

    )
}

export {OmaKirja}