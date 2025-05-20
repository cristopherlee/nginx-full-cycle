const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function addPerson(name) {
  const [rows] = await pool.query(
    'INSERT INTO people (name) VALUES (?)',
    [name]
  );
}

async function getPeople() {
  const [rows] = await pool.query('SELECT * FROM people');
  return rows;
}

app.get('/', async (req, res) => {
  try {
    await addPerson("João"); // Você pode alterar o nome conforme quiser
    const people = await getPeople();
    
    let html = '<h1>Full Cycle Rocks!</h1><ul>';
    for (let person of people) {
      html += `<li>${person.name}</li>`;
    }
    html += '</ul>';

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao acessar o banco de dados.');
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});