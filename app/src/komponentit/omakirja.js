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
          <Container sx={{ bgcolor: "#D4EBEC", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Tämä on yhden kirjan sivu
            </Typography>
            <img src={etukansi} height={200} width={200} alt="Etukansi" />
            <Typography variant="h5" align="center" gutterBottom>
              {kirjanNimi}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Kirjailija: {kirjailija}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Järjestysnumero: {jarjestysnumero}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Kuntoluokka: {kuntoluokka}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Hankintahinta: {hankintaHinta} €
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Painovuosi: {painovuosi}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Painos: {painos}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Hankinta-aika: {hankintaAika}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Esittelyteksti: {esittelyTeksti}
            </Typography>
            <img src={takaKansi} height={200} width={200} alt="Takakansi" />
          </Container>
        </>
      );
}

export {OmaKirja}