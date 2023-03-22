import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppiBaari } from './komponentit/Appbar';
import { Etusivu } from './komponentit/Etusivu';
import { Kirja } from './komponentit/kirja';
import { Kirjat } from './komponentit/Kirjat';
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { Kokoelma } from './komponentit/kokoelma';
import { Kokoelmat } from './komponentit/Kokoelmat';
import { OmaKirja }  from './komponentit/omakirja';
import { OmaKokoelma } from './komponentit/omakokoelma';
import { Omankokoelmankirjat } from './komponentit/omankokoelmankirjat';
import { Rekisteroityminen } from './komponentit/Rekisteroityminen';
import { Tietoa } from './komponentit/Tietoa';
import { Valikko } from './komponentit/Valikko';


function App() {

  const [laskuri,setLaskuri] = useState(0);

  const [kirjaSarjaId,setKirjaSarjaId] = useState(() => {
    const saved = localStorage.getItem("kirjaSarjaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  } );

  const [kirjaId,setKirjaId] = useState(() => {
    const saved = localStorage.getItem("kirjaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [kirjautumisToken,setKirjautumisToken] = useState(() => {
    const saved = localStorage.getItem("kirjautumisToken");
    const initialValue = saved !== undefined ? JSON.parse(saved) : false;
    return initialValue || "";
  });

  const [kayttajaId,setKayttajaId] = useState(() => {
    const saved = localStorage.getItem("kayttajaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [idOmatSarjat,setIdOmatSarjat] = useState(() => {
    const saved = localStorage.getItem("idOmatSarjat");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [idOmaKirja,setIdOmaKirja] = useState(() => {
    const saved = localStorage.getItem("idOmaKirja");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [admin,setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });


  useEffect( () => {
    window.localStorage.setItem("kirjaSarjaId", JSON.stringify(kirjaSarjaId));
  },[kirjaSarjaId])

  useEffect(() => {
    window.localStorage.setItem("kirjautumisToken", JSON.stringify(kirjautumisToken));
  },[kirjautumisToken])

  useEffect( () => {
    window.localStorage.setItem("kayttajaId", JSON.stringify(kayttajaId));
  },[kayttajaId])

  useEffect(() => {
    window.localStorage.setItem("idOmatSarjat", JSON.stringify(idOmatSarjat));
  },[idOmatSarjat])

  useEffect(() => {
    window.localStorage.setItem("kirjaId", JSON.stringify(kirjaId));
  },[kirjaId])

  useEffect( () => {
    window.localStorage.setItem("idOmaKirja", JSON.stringify(idOmaKirja));
  },[idOmaKirja])

  useEffect(() => {
    window.localStorage.setItem("admin", JSON.stringify(admin));
  },[admin])

  return (

    <>

      <AppiBaari kirjautumisToken={kirjautumisToken} setKirjautumisToken={setKirjautumisToken} setAdmin={setAdmin} />
      <Valikko setLaskuri={setLaskuri} kirjautumisToken={kirjautumisToken} laskuri={laskuri} />

      <Routes>
          
          <Route path='/' element={<Etusivu />} />
          <Route path='kirjat' element={<Kirjat />} />
          <Route path='tietoa' element={<Tietoa laskuri={laskuri} />} />
          <Route path='kokoelmat' element={<Kokoelmat  laskuri={laskuri} setId={setKirjaSarjaId} admin={admin} />} />
          <Route path='kirjautuminen' element={<Kirjautuminen setKirjautumisToken={setKirjautumisToken} kirjautumisToken={kirjautumisToken} setKayttajaId={setKayttajaId} setAdmin={setAdmin} />} />
          <Route path='rekisteroityminen' element={<Rekisteroityminen />} />
          <Route path='kokoelma' element={<Kokoelma id={kirjaSarjaId} setKirjaId={setKirjaId} admin={admin}/>} />
          <Route path='kirja' element={<Kirja  id={kirjaId}/>} />
          <Route path='omakokoelma' element={<OmaKokoelma kayttajaId={kayttajaId} laskuri={laskuri} setIdOmatSarjat={setIdOmatSarjat} />} />
          <Route path='omankokoelmankirjat' element={<Omankokoelmankirjat idOmatSarjat={idOmatSarjat} setIdOmatSarjat={setIdOmatSarjat} setIdOmaKirja={setIdOmaKirja}/>} />
          <Route path='omakirja' element={<OmaKirja idOmaKirja={idOmaKirja} />} />

          
      </Routes>
    
    </>
    
    
  );
}

export {App}
