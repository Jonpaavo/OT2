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
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { AppiBaari } from './komponentit/Appbar';
import { Kokoelmat } from './komponentit/Kokoelmat';
import { AppBar, Container } from '@mui/material';

let confirmSpy

describe("1. Kirjautimisen testaus" , () => {

  /*
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
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
    )
    
  //expect(screen.getByText(/Tämä on Kirjautuminen/i)).toBeInTheDocument()

  const searchInput1 = screen.getByTestId("kirjaudu_input")
  const searchInput2 = screen.getByTestId("salasana_input")
  const searchButton1 = screen.getByTestId("kirjaudu_button")

  const kirjauduElement = screen.getByTestId("kirjaudu_typo")

  fireEvent.change(searchInput1, {target: {value: "User"},})
  fireEvent.change(searchInput2, {target: {value: "user"},})
  fireEvent.click(searchButton1)
  fireEvent.click(searchButton1)
  
  screen.debug();

  expect(kirjauduElement).toHaveTextContent("penis")

  

  //render(<AppBar />)
  //const searchButton2 = screen.getByTestId("appbar_kirjaudu_ulos")
  //fireEvent.click(searchButton2)
})

test("3. kirjaudu ulos", async () => {
  render(
    <AppiBaari />
    )
  const searchButton = screen.getByText(/Kirjaudu ulos/i)
  fireEvent.click(searchButton)
})

test("4. näkyykö sql", async () => {
  render(
    <Kokoelmat />
    )
  expect(kirjauduElement).toHaveTextContent("penis")

  //const searchButton = screen.getByText(/Harry Potter/i)
  //fireEvent.click(searchButton)
})
*/

test("Renderaa etusivu", async () => {
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
    )
    expect(screen.getByText("Kirja-arkisto"))

    const temp1 = screen.getByText("Kirjaudu sisään")
    fireEvent.click(temp1)

    expect(screen.getByText("Tämä on Kirjautuminen"))

})

test("Kirjautumissivu", async () => {
  const history = createMemoryHistory();

  //history.replace('/http://localhost:3000/kirjautuminen')
  render(
    <Router history={history}>
      <App />
    </Router>
    )

    //expect(screen.getByText("Tämä on Kirjautuminen"))

    const temp1 = screen.getByTestId("appbar_kirjaudu")
    fireEvent.click(temp1)

    expect(history.location.pathname).toBe("/kirjautuminen")

})

})

