import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OmaKirja = (props) => {

    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setjarjestysnumero] = useState("");
    const [kirjailija,setKirjailija] = useState("");
    const [idOmatSarjat,setIdOmatSarjat] = useState(props.idOmatSarjat);
    const [kuntoluokka,setKuntoluokka] = useState("");
    const [etuKansiKuva,setEtuKansiKuva] = useState(null);
    const [takaKansiKuva,setTakaKansiKuva] = useState(null);
    const [hankintaHinta,setHankintaHinta] = useState("");
    const [hankintaAika,setHankintaAika] = useState("");
    const [esittelyTeksti,setEsittelyTeksti] = useState("");
    const [painovuosi,setPainovuosi] = useState("");
    const [painos,setPainos] = useState("");
    const [query,setQuery] = useState("?id=" + props.idOmaKirja);
    const [id,setId] = useState("");
    const [takaKannenSrc,setTakaKannenSrc] = useState("");
    const [etuKannenSrc,setEtuKannenSrc] = useState("");
    const takaKansi = window.location.origin + "/kuvat/" + takaKannenSrc;
    const etukansi = window.location.origin + "/kuvat/" + etuKannenSrc;


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/omakirja" + query);

            let c = await response.json();

            

            c.map((item,index) => {

                setId(item.id);
                setKirjanNimi(item.nimi);
                setjarjestysnumero(item.jarjestysnumero);
                setKirjailija(item.kirjailija);
                setIdOmatSarjat(item.idomatsarjat);
                setKuntoluokka(item.kuntoluokka);
                setHankintaHinta(item.hankintahinta);
                setHankintaAika(item.hankintaaika);
                setEsittelyTeksti(item.esittelyteksti);
                setPainovuosi(item.painovuosi);
                setPainos(item.painos);
                setTakaKannenSrc(item.takakansikuva);
                setEtuKannenSrc(item.etukansikuva);
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
                <Typography variant="h6" align="center">Tässä on kirjan järjestysnumero: {jarjestysnumero}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kirjailija: {kirjailija}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kuntoluokka: {kuntoluokka}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan hankintahinta: {hankintaHinta}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan hankinta-aika: {hankintaAika}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan esittelyteksti: {esittelyTeksti}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan painovuosi: {painovuosi}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan painos: {painos}</Typography>
        
                <img src={takaKansi} height={200} width={200} />
                <img src={etukansi} height={200} width={200} />
            </Container>
        
        
        </>

    )
}

export {OmaKirja}