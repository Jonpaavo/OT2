import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
    const [muokkaa,setMuokkaa] = useState(false);
    const [muokkaaIidee,setMuokkaaIidee] = useState(props.id);
    const [takaKannenSrc,setTakaKannenSrc] = useState("");
    const [etuKannenSrc,setEtuKannenSrc] = useState("");
    const takaKansi = window.location.origin + "/kuvat/" + takaKannenSrc;
    const etukansi = window.location.origin + "/kuvat/" + etuKannenSrc;

  


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

    

    const handleMuokkaus = () => {
        setMuokkaa(true);
    }

    


    

    return (

        <>
            <Container sx={{bgcolor: "brown", height: "100vh"}}>
                <Typography variant="h6" align="center">Tämä on yhden kirjan sivu</Typography>
                <Typography variant="h6" align="center">Tämä on klikatun kirjan id: {props.id}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan nimi: {kirjanNimi}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kirjailijat: {kirjailijat}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan piirtäjät: {piirtajat}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan ensipainovuosi: {ensipainovuosi}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan kuvausteksti: {kuvausTeksti}</Typography>
                <Typography variant="h6" align="center">Tässä on kirjan painokset: {painokset}</Typography>

                { props.admin &&
                    <div><button onClick={() => handleMuokkaus()}>Muokkaa</button></div>

                }
                

                {muokkaa == true &&
                    <div>
                        <input type="file" onChange={fileOnChangeTakaKansi}></input>
                        <button onClick={sendTakaKansi}>Päivitä Takakansi</button>
                        <input type="file" onChange={fileOnChangeEtuKansi}></input>
                        <button onClick={sendEtuKansi}>Päivitä Etukansi</button>
                        

                        <button onClick={() => setMuokkaa(false)}>Sulje muokkaus</button>
                    </div>

                }
                

                <img src={takaKansi} height={200} width={200} />
                <img src={etukansi} height={200} width={200} />
            </Container>
        
        
        </>

    )
}

export {Kirja}