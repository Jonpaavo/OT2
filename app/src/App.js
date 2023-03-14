import {Routes, Route} from 'react-router-dom';
import {AppiBaari} from './sivut/Appbar';
import {Etusivu} from './sivut/Etusivu';
import { Kirjat } from './sivut/Kirjat';
import { Kokoelmat } from './sivut/Kokoelmat';
import { Tietoa } from './sivut/Tietoa';
import {Valikko} from './sivut/Valikko';
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
