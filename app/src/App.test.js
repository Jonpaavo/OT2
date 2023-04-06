import { 
  fireEvent,
  render,
  screen,
  within,
  waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils"
import userEvent from '@testing-library/user-event'
import { App } from './App';
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { AppiBaari } from './komponentit/Appbar';
import { MemoryRouter as Router, BrowserRouter } from 'react-router-dom';
import {createMemoryHistory} from 'history';


let confirmSpy

describe("1. Kirjautimisen testaus" , () => {

test("1. Avaa kirjautumis välilehti", async () => {
  const history = createMemoryHistory()
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
    )
  const searchButton = screen.getByTestId("appbar_kirjaudu")
  fireEvent.click(searchButton)

})

test("2. Varmista että ollaan kirjautumis-välilehdellä", async () => {
  render(<Kirjautuminen/>)
    
  //expect(screen.getByText(/Tämä on Kirjautuminen/i)).toBeInTheDocument()

  const searchInput1 = screen.getByTestId("kirjaudu_input")
  const searchInput2 = screen.getByTestId("salasana_input")
  const searchButton1 = screen.getByTestId("kirjaudu_button")

  const kirjauduElement = screen.getByText(/ei kirjauduttu/i)

  userEvent.type(searchInput1, "User")
  userEvent.type(searchInput2, "user")
  fireEvent.click(searchButton1)
  fireEvent.click(searchButton1)
  
  expect(kirjauduElement).toHaveTextContent("kirjauduttu")

  
})

})

