const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb',
});

db.connect(err => {
  if (err) {
    console.log('Error connecting to the database', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error en el servidor' });
    }
    if (result.length > 0) {
      res.send({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).send({ message: 'Credenciales incorrectas' });
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
