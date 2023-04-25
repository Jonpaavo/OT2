import { Container, Typography, Button, TextField, Box } from "@mui/material";
import { useEffect, useState, Link } from "react";

const Kirja = (props) => {


    const [kirjanNimi,setKirjanNimi] = useState("");
    const [kirjailijat,setKirjailijat] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [painokset,setPainokset] = useState("");
    const [query,setQuery] = useState("?id=" + props.id);
    const [takaKansiKuva,setTakaKansiKuva] = useState({});
    const [etuKansiKuva,setEtuKansiKuva] = useState({});
    const [muokkaaKirja,setMuokkaaKirja] = useState(false);
    const [muokkaaIidee,setMuokkaaIidee] = useState(props.id);
    const [takaKannenSrc,setTakaKannenSrc] = useState("");
    const [etuKannenSrc,setEtuKannenSrc] = useState("");
    const takaKansi = window.location.origin + "/kuvat/" + takaKannenSrc;
    const etukansi = window.location.origin + "/kuvat/" + etuKannenSrc;
    const [muokkaaKirjanNimi, setMuokkaaKirjanNimi] = useState("");
    const [muokkaaKirjanJärjestysNro, setMuokkaaKirjanJärjestysNro] = useState("")
    const [muokkaaKirjanKirjailija, setMuokkaaKirjanKirjailija] = useState("");
    const [muokkaaKirjanPiirtäjä, setMuokkaaKirjanPiirtäjä] = useState("");
    const [muokkaaKirjanPainoVuosi, setMuokkaaKirjanPainosVuosi] = useState("");
    const [muokkaaKirjanKuvaus, setMuokkaaKirjanKuvaus] = useState("");
    const [muokkaaKirjanPainos, setMuokkaaKirjanPainos] = useState("");
    const [muokkaaLaskuri, setMuokkaaLaskuri] = useState(0);
    const [poistaLaskuri, setPoistaLaskuri] = useState(0);
  


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/kirja" + query);

            let c = await response.json();

            console.log(c);

            

            c.map((item,index) => {

                setKirjanNimi(item.nimi);
                setKirjailijat(item.kirjailija);
                setPiirtajat(item.piirtajat);
                setEnsipainovuosi(item.ensipainovuosi);
                setKuvausTeksti(item.kuvausteksti);
                setPainokset(item.painokset);
                setTakaKannenSrc(item.takakansikuva);
                setEtuKannenSrc(item.etukansikuva);
                
            });

        }


        haeTiedot();

    },[props.id])

    useEffect( () => {

        const Muokkaa = async () => {
            
            console.log("Yritetään fetchaa muokkaus")
            fetch("http://localhost:3004/kirja/"+props.id, {
                
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    nimi : muokkaaKirjanNimi,
                    jarjestysnumero : muokkaaKirjanJärjestysNro,
                    kuvausteksti : muokkaaKirjanKuvaus,
                    kirjailija : muokkaaKirjanKirjailija,
                    piirtajat : muokkaaKirjanPiirtäjä,
                    ensipainovuosi : muokkaaKirjanPainoVuosi,
                    painokset : muokkaaKirjanPainos,
                })
            });
            console.log("Muokkaa() sisällä")
        }

        if (muokkaaLaskuri > 0) {
            console.log("muokkauslaskuri enemmän kuin 0")
            Muokkaa();     
        }

        setMuokkaaKirjanNimi("")
        setMuokkaaKirjanJärjestysNro("")
        setMuokkaaKirjanKuvaus("")
        setMuokkaaKirjanKirjailija("")
        setMuokkaaKirjanPiirtäjä("")
        setMuokkaaKirjanPainosVuosi("")
        setMuokkaaKirjanPainos("")

    },[muokkaaLaskuri])

    const fileOnChangeTakaKansi = (event) => {
        setTakaKansiKuva(event.target.files[0]);
        
    }

    const sendTakaKansi = (event) => {
        let formData = new FormData();
        formData.append('takakansi', takaKansiKuva);
        fetch("http://localhost:3004/kirja/" + muokkaaIidee, {
          method : "put",
          body : formData,
        });

        
    }

    const fileOnChangeEtuKansi = (event) => {
        setTakaKansiKuva(event.target.files[0]);
        
    }

    const sendEtuKansi = (event) => {
        let formData = new FormData();
        formData.append('etukansi', etuKansiKuva);
        fetch("http://localhost:3004/kirja/" + muokkaaIidee, {
          method : "put",
          body : formData,
        });

        
    }

    
    /*
    const handleMuokkaus = () => {
        setMuokkaa(true);
    }
    */
    
    const toggleMuokkaaKirja = () => {
        setMuokkaaKirja(!muokkaaKirja)

    }

    const peruKirjaMuokkaus = () => {
        setMuokkaaKirjanNimi("")
        setMuokkaaKirjanKirjailija("")
        setMuokkaaKirjanPiirtäjä("")
        setMuokkaaKirjanPainosVuosi("")
        setMuokkaaKirjanKuvaus("")
        setMuokkaaKirjanPainos("")

        toggleMuokkaaKirja()
    }

    const handleSubmit = () => {
        setMuokkaaLaskuri(muokkaaLaskuri+1)
        console.log(muokkaaLaskuri)
    }

    const poistaKirja = () => {
        fetch("http://localhost:3004/kirja/"+props.id,{

            method : 'DELETE'}).then((response)=> {
                    console.log("Poistettiin id: ",props.id," - Response on: ",response);
            })
    }
    

    return (

        <>
            <Container maxWidth={false} sx={{ bgcolor: "#D4EBEC", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{mb: 5}} variant="h6" align="center">Tämä on yhden kirjan sivu</Typography>
                {!muokkaaKirja ? 
                <div>
                    <Typography variant="subtitle1" align="center"> kirjan id: {props.id}</Typography>
                    <Typography variant="subtitle1" align="center">kirjan nimi: {kirjanNimi}</Typography>
                    <Typography variant="subtitle1" align="center">kirjailijat: {kirjailijat}</Typography>
                    <Typography variant="subtitle1" align="center">piirtäjät: {piirtajat}</Typography>
                    <Typography variant="subtitle1" align="center">ensipainos: {ensipainovuosi}</Typography>
                    <Typography variant="subtitle1" align="center">kuvausteksti: {kuvausTeksti}</Typography>
                    <Typography variant="subtitle1" align="center">painokset: {painokset}</Typography>

                    { props.admin &&
                        <div>
                            
                            <Button sx={{ml: 15}} variant="contained" onClick={() => toggleMuokkaaKirja()}>Muokkaa</Button>
                            <Button sx={{ml: 0}} variant="contained" href="/kokoelma" onClick={() => poistaKirja()}>Poista</Button>
                        </div>

                    }

                    <img src={takaKansi} height={200} width={200} />
                    <img src={etukansi} height={200} width={200} />
                </div>
                : 
                
                <form onSubmit={handleSubmit}> 
                <div>
                    <Typography sx={{mb: 5}} variant="h6" align="center">Tämä on klikatun kirjan id: {props.id}</Typography>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan nimi" onChange={(e) => setMuokkaaKirjanNimi(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan järjestysnro" onChange={(e) => setMuokkaaKirjanJärjestysNro(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan kuvausteksti" onChange={(e) => setMuokkaaKirjanKuvaus(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan kirjailijat" onChange={(e) => setMuokkaaKirjanKirjailija(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan piirtäjät" onChange={(e) => setMuokkaaKirjanPiirtäjä(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan ensipainosvuosi" onChange={(e) => setMuokkaaKirjanPainosVuosi(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1}} label="Kirjan painokset" onChange={(e) => setMuokkaaKirjanPainos(e.target.value)}></TextField>
                </div>

                        <div>
                        <Button sx={{ml: 1}} variant="contained" type="submit">Muokkaa</Button>    
                        </div>
                        <div>   
                        <Button sx={{ml: 1}} variant="contained" onClick={() => peruKirjaMuokkaus()}>Peru muokkaus</Button>
                        </div> 
                
                </form>}
                
                
                
                
                {/*
                {muokkaa == true &&
                    <div>
                        <input type="file" onChange={fileOnChangeTakaKansi}></input>
                        <button onClick={sendTakaKansi}>Päivitä Takakansi</button>
                        <input type="file" onChange={fileOnChangeEtuKansi}></input>
                        <button onClick={sendEtuKansi}>Päivitä Etukansi</button>
                        

                        <button onClick={() => setMuokkaa(false)}>Sulje muokkaus</button>
                    </div>

                }
                */}
                

                
            </Container>
        
        
        </>

    )
}

export {Kirja}