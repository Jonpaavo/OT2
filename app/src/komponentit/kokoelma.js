import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Form, NavLink } from "react-router-dom";

const Kokoelma = (props) => {

    const [query,setQuery] = useState("?idkirjasarja=" + props.id);

    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setjarjestysnumero] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [kirjailija,setKirjailija] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [painokset,setPainokset] = useState("");
    const [etuKansiKuva,setEtuKansiKuva] = useState(null);
    const [takaKansiKuva,setTakaKansiKuva] = useState(null);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [idKirjaSarja,setIdKirjaSarja] = useState(props.id);
    const [kirjatTable,setKirjatTable] = useState([props.kirjatTable]);
    let  kirja = new FormData();

    useEffect( () => {

        const haeKirjat = async () => {

            let response = await fetch("http://localhost:3004/kirja" + query);

            let c = await response.json();

            setKirjatTable(c);

            console.log(props.id);
        }

        haeKirjat();

    },[])

    
    useEffect( () => {

        const lisaaKirja = async () => {

            let formData = new FormData();
            formData.append("nimi", kirjanNimi);
            formData.append("jarjestysnumero", jarjestysnumero);
            formData.append("kuvausteksti", kuvausTeksti);
            formData.append("kirjailija",kirjailija);
            formData.append("piirtajat", piirtajat);
            formData.append("ensipainovuosi", ensipainovuosi);
            formData.append("painokset", painokset);
            formData.append("idkirjasarja", idKirjaSarja);
            formData.append("takakansikuva", takaKansiKuva);
            formData.append("etukansikuva", etuKansiKuva);

            fetch("http://localhost:3004/kirja/", {
                method : 'post',
                body : formData,
            });
        }


        if (lisaaQuery != "") {
            lisaaKirja();
        }
        
        setKirjanNimi("");
        setjarjestysnumero("");
        setKuvausTeksti("");
        setKirjailija("");
        setPiirtajat("");
        setEnsipainovuosi("");
        setPainokset("");
        setTakaKansiKuva(null);
        setEtuKansiKuva(null);

    },[lisaaQuery])

    const handlePost = () => {

        let m = [];

        if (kirjanNimi != "")
            kirja.append("nimi",kirjanNimi)
        
        if (jarjestysnumero != "")
            kirja.append("jarjestysnumero",jarjestysnumero)

        if (kuvausTeksti != "")
            kirja.append("kuvausteksti",kuvausTeksti)

        if (kirjailija != "")
            kirja.append("kirjailija",kirjailija)

        if (piirtajat != "")
            kirja.append("piirtajat",piirtajat)
        
        if (ensipainovuosi != "")
            kirja.append("ensipainovuosi",ensipainovuosi)

        if (painokset != "")
            kirja.append("painokset",painokset)

        if (idKirjaSarja != "")
            kirja.append("idkirjasarja",idKirjaSarja)
        
        
        kirja.append("takakansikuva",takaKansiKuva)
        
        
        kirja.append("etukansikuva",etuKansiKuva)

        console.log("Takakansikuva: " + kirja.get("takakansikuva"));
        console.log("EtukansiKuva: " + kirja.get("etukansikuva"));

        setLisaaQuery(kirja);

        

    }

    return (

        <>
            <Container sx={{bgcolor: "lightgoldenrodyellow", height: "100vh"}}>

                { props.admin == true &&
                    <div> 
                        <form onSubmit={handlePost}>
                            <TextField required id="outlined-nimi" label="Nimi" onChange={(e) => setKirjanNimi(e.target.value)}></TextField>
                            <TextField required id="outlined-jarjestysnumero" label="Järjestysnumero" onChange={(e) => setjarjestysnumero(e.target.value)}></TextField>
                            <TextField required id="outlined-kuvausteksti" label="Kuvausteksti" onChange={(e) => setKuvausTeksti(e.target.value)}></TextField>
                            <TextField required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setKirjailija(e.target.value)}></TextField>
                            <TextField required id="outlined-piirtajat" label="Piirtäjät" onChange={(e) => setPiirtajat(e.target.value)}></TextField>
                            <TextField required id="outlined-ensipainovuosi" label="Ensipainovuosi" onChange={(e) => setEnsipainovuosi(e.target.value)}></TextField>
                            <TextField required id="outlined-painokset" label="Painokset" onChange={(e) => setPainokset(e.target.value)}></TextField>
                            <input type="file" name="takakansikuva" onChange={(e) => {setTakaKansiKuva(e.target.files[0]) ; console.log(e.target.files[0])}}></input>
                            <input type="file" name="etukansikuva" onChange={(e) => setEtuKansiKuva(e.target.files[0])}></input>
                            <Button variant="outlined" type="submit">Lisää kirja</Button>
                        </form>               
                    

                    
                    
                    </div>
                }
                
                    
                        <TableContainer>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nimi</TableCell>
                                    <TableCell>Järjestysnumero</TableCell>
                                    <TableCell>Kuvausteksti</TableCell>
                                    <TableCell>Kirjailija</TableCell>
                                    <TableCell>Piirtäjä</TableCell>
                                    <TableCell>Ensipainovuosi</TableCell>
                                    <TableCell>Painokset</TableCell>
                                    <TableCell>{/* Namiskukkelit */}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kirjatTable.map && kirjatTable.map((row,index) =>(
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row"><NavLink to='/kirja' onClick={() => props.setKirjaId(row.id)}>{row.nimi}</NavLink></TableCell>
                                        <TableCell>{row.jarjestysnumero}</TableCell>
                                        <TableCell>{row.kuvausteksti}</TableCell>
                                        <TableCell>{row.kirjailija}</TableCell>
                                        <TableCell>{row.piirtajat}</TableCell>
                                        <TableCell>{row.ensipainovuosi}</TableCell>
                                        <TableCell>{row.painokset}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Container>
        </>
    )
}

export {Kokoelma}