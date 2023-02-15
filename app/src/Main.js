import { useEffect, useInsertionEffect, useState } from "react"

const Kokeilu = () => {

    const [haeQuery,setHaeQuery] = useState("");
    const [tableTiedot,setTableTiedot] = useState([]);
    const [haeNimi,setHaeNimi] = useState("");
    const [haeJarjestysnumero,setHaeJarjestysnumero] = useState("");
    const [haeKuvausteksti,setHaeKuvausteksti] = useState("");
    const [haeKirjailija,setHaeKirjailija] = useState("");
    const [haePiirtajat,setHaePiirtajat] = useState("");
    const [haeEnsipainovuosi,setHaeEnsipainovuosi] = useState("");
    const [haePainokset,setHaePainokset] = useState("");
    const [laskuri,setLaskuri] = useState(0);


    const handleSubmit = (event) => {
        event.preventDefault();
    }


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/kirja" + haeQuery);

            let c = await response.json();

            setTableTiedot(c);


        }

        if (laskuri > 0) {

            haeTiedot();
        }

    },[laskuri]);


    const handleFetch = () => {

        let m = "";

        if (haeNimi == "" && haeJarjestysnumero && haeKuvausteksti && haeKirjailija && haePiirtajat && haeEnsipainovuosi && haePainokset) {
            m = ""
        }

        else if (haeNimi != "") {
            m = "?nimi=" + haeNimi;
        }

        setHaeQuery(m);

        setLaskuri(laskuri + 1);
    }


    const data = tableTiedot.map( (item,index) => {
        return (
            <tr key={index}>
                <td>{item.nimi}</td>
                <td>{item.jarjestysnumero}</td>
                <td>{item.kuvausteksti}</td>
                <td>{item.kirjailija}</td>
                <td>{item.piirtajat}</td>
                <td>{item.ensipainovuosi}</td>
                <td>{item.painokset}</td>
            </tr>
        );
    });


    return (

        <div>

            <h1>Otsikko perkele</h1>

            
            <form onSubmit={(e) => handleSubmit(e)}>

                <label>
                    Nimi
                    <input type="text" onChange={(e) => setHaeNimi(e.target.value)}></input>
                </label>

                <label>
                    Järjestysnumero
                    <input type="text" onChange={(e) => setHaeJarjestysnumero(e.target.value)}></input>
                </label>

                <label>
                    Kuvausteksti
                    <input type="text" onChange={(e) => setHaeKuvausteksti(e.target.value)}></input>
                </label>

                <label>
                     Kirjailija
                    <input type="text" onChange={(e) => setHaeKirjailija(e.target.value)}></input>
                </label>

                <label>
                    piirtäjät
                    <input type="text" onChange={(e) => setHaePiirtajat(e.target.value)}></input>
                </label>

                <label>
                    Ensipainovuosi
                    <input type="text" onChange={(e) => setHaeEnsipainovuosi(e.target.value)}></input>
                </label>

                <label>
                    Painokset
                    <input type="text" onChange={(e) => setHaePainokset(e.target.value)}></input>
                </label>
                
                <button onClick={() => {handleFetch()}}>Etsi kirjoja</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Järjestysnumero</th>
                        <th>Kuvausteksti</th>
                        <th>Kirjailija</th>
                        <th>Piirtäjät</th>
                        <th>Ensipainovuosi</th>
                        <th>Painokset</th>
                    </tr>
                </thead>
                 <tbody>
                    {data}
                </tbody>
            </table>

        </div>
    )
}

export {Kokeilu}