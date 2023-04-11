import { render, screen, fireEvent } from '@testing-library/react';
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { Rekisteroityminen} from './komponentit/Rekisteroityminen';
import { Kokoelmat } from "./komponentit/Kokoelmat";
import './TestConfig'
import mysql from 'mysql2/promise';
import { act } from "react-dom/test-utils";

let confirmSpy

describe('Kirjautuminen component', () => {
  test('renders Kirjautuminen component', () => {
    render(<Kirjautuminen />);
    const kirjautuminenElement = screen.getByText(/Tämä on Kirjautuminen/i);
    expect(kirjautuminenElement).toBeInTheDocument();
  });

  test('handles login correctly', async () => {
    // Mock database connection
    const connectionMock = jest.spyOn(mysql, 'createConnection').mockResolvedValue({
      execute: jest.fn().mockResolvedValueOnce([{ id: 1, nimi: 'test', salasana: 'password', admin: false }])
    });

    // Set up component and input values
    render(<Kirjautuminen />);
    const usernameInput = screen.getByLabelText(/Käyttäjänimi/i);
    const passwordInput = screen.getByLabelText(/Salasana/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Click login button
    const loginButton = screen.getByTestId('kirjaudu_button');
    fireEvent.click(loginButton);
    fireEvent.click(loginButton);

    // Wait for login to complete
    await screen.findByTestId('kirjaudu_typo');

    // Check that login was successful and user is logged in
    const kirjauduTypo = screen.getByTestId('kirjaudu_typo');
    expect(kirjauduTypo).toHaveTextContent('penis');

    // Check that database was queried with correct values
    expect(connectionMock).toHaveBeenCalledWith({
      host: 'localhost',
      user: 'testuser',
      password: 'testpassword',
      database: 'testdb'
    });
    expect(connectionMock.mock.calls[0][0].execute).toHaveBeenCalledWith('SELECT * FROM users WHERE nimi = ? AND salasana = ?', ['test', 'password']);
  });
});

describe('Rekisteroityminen', () => {
  test('renders the form correctly', () => {
    render(<Rekisteroityminen />);
    const nimiInput = screen.getByTestId('rekisteröidy_input');
    const salasanaInput = screen.getByTestId('rsalasana_input');
    const rekisteroidyButton = screen.getByText('Rekisteröidy');

    expect(nimiInput).toBeInTheDocument();
    expect(salasanaInput).toBeInTheDocument();
    expect(rekisteroidyButton).toBeInTheDocument();
  });

  test('submitting the form sends a POST request with correct data', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    render(<Rekisteroityminen />);
    const nimiInput = screen.getByTestId('rekisteröidy_input');
    const salasanaInput = screen.getByTestId('rsalasana_input');
    const rekisteroidyButton = screen.getByText('Rekisteröidy');

    fireEvent.change(nimiInput, { target: { value: 'testikayttaja' } });
    fireEvent.change(salasanaInput, { target: { value: 'testisalasana' } });
    fireEvent.click(rekisteroidyButton);

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3004/kayttaja/',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nimi: 'testikayttaja',
          salasana: 'testisalasana',
        }),
      })
    );
  });
});

jest.mock("mysql2/promise");

const mockData = [
  {
    id: 1,
    kirjasarja: "Harry Potter",
    kustantaja: "Bloomsbury",
    kuvaus: "Fantasy series about a boy wizard",
    luokittelu: "Fantasy",
  },
  {
    id: 2,
    kirjasarja: "The Lord of the Rings",
    kustantaja: "Allen & Unwin",
    kuvaus: "Epic high fantasy novel",
    luokittelu: "Fantasy",
  },
];

describe("Kokoelmat component", () => {
  beforeEach(() => {
    mysql.createConnection.mockResolvedValue({
      execute: jest.fn(),
      executeWithParams: jest.fn(),
      query: jest.fn(),
    });

    mysql.createConnection.mockClear();
  });

  it("renders the component with a table of books", async () => {
    mysql.createConnection.mockResolvedValue({
      query: jest.fn().mockResolvedValue([mockData]),
    });

    await act(async () => {
      render(<Kokoelmat />);
    });

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("The Lord of the Rings")).toBeInTheDocument();
  });

  it("adds a book to the database", async () => {
    mysql.createConnection.mockResolvedValue({
      executeWithParams: jest.fn().mockResolvedValue([{ insertId: 1 }]),
    });

    await act(async () => {
      render(<Kokoelmat />);
    });

    const kirjasarjaInput = screen.getByLabelText("Kirjasarja");
    const kustantajaInput = screen.getByLabelText("Kustantaja");
    const kuvausInput = screen.getByLabelText("Kuvaus");
    const luokitteluInput = screen.getByLabelText("Luokittelu");

    fireEvent.change(kirjasarjaInput, { target: { value: "Test Book" } });
    fireEvent.change(kustantajaInput, { target: { value: "Test Publisher" } });
    fireEvent.change(kuvausInput, {
      target: { value: "This is a test book" },
    });
    fireEvent.change(luokitteluInput, { target: { value: "Test Genre" } });

    const addButton = screen.getByText("Lisää kokoelma");
    fireEvent.click(addButton);

    expect(mysql.createConnection).toHaveBeenCalledTimes(1);
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: "localhost",
      user: "root",
      password: "password",
      database: "test_db",
    });

    expect(
      mysql.createConnection().executeWithParams
    ).toHaveBeenCalledWith(
      "INSERT INTO kirjasarja (kirjasarja, kustantaja, kuvaus, luokittelu) VALUES (?, ?, ?, ?)",
      ["Test Book", "Test Publisher", "This is a test book", "Test Genre"]
    );
  });
});
