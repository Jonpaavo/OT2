import {Routes, Route} from 'react-router-dom';
import {AppiBaari} from './komponentit/Appbar';
import {Etusivu} from './komponentit/Etusivu';
import { Kirjat } from './komponentit/Kirjat';
import { Kokoelmat } from './komponentit/Kokoelmat';
import { Tietoa } from './komponentit/Tietoa';
import {Valikko} from './komponentit/Valikko';
function App() {
  return (

    <>

      <AppiBaari />
      <Valikko />

      <Routes>
          
          <Route path='/' element={<Etusivu />} />
          <Route path='kirjat' element={<Kirjat />} />
          <Route path='tietoa' element={<Tietoa />} />
          <Route path='kokoelmat' element={<Kokoelmat />} />
          
          

          
      </Routes>
    
    </>
    
    
  );
}

export {App}
