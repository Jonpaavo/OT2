import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import {AppiBaari} from './komponentit/Appbar';
import {Etusivu} from './komponentit/Etusivu';
import { Kirjat } from './komponentit/Kirjat';
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { Kokoelma } from './komponentit/kokoelma';
import { Kokoelmat } from './komponentit/Kokoelmat';
import { Rekisteroityminen } from './komponentit/Rekisteroityminen';
import { Tietoa } from './komponentit/Tietoa';
import {Valikko} from './komponentit/Valikko';


function App() {

  

  const [laskuri,setLaskuri] = useState(0);

  const [kirjaSarjaId,setKirjaSarjaId] = useState("0");

  return (

    <>

      <AppiBaari />
      <Valikko setLaskuri={setLaskuri} laskuri={laskuri} />

      <Routes>
          
          <Route path='/' element={<Etusivu />} />
          <Route path='kirjat' element={<Kirjat />} />
          <Route path='tietoa' element={<Tietoa laskuri={laskuri} />} />
          <Route path='kokoelmat' element={<Kokoelmat  laskuri={laskuri} setId={setKirjaSarjaId} />} />
          <Route path='kirjautuminen' element={<Kirjautuminen />} />
          <Route path='rekisteroityminen' element={<Rekisteroityminen />} />
          <Route path='kokoelma' element={<Kokoelma id={kirjaSarjaId}/>} />
          
          

          
      </Routes>
    
    </>
    
    
  );
}

export {App}
