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


// Ruta para obtener todas las personas
app.get('/personas', (req, res) => {
  const query = 'SELECT * FROM persona';
  
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err);
      return res.status(500).send({ message: 'Error en el servidor' });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No se encontraron personas' });
    }
    res.json(result);
  });
});

// Ruta para obtener los datos de un paciente por su id
app.get('/paciente/:id', (req, res) => {
  const pacienteId = req.params.id;

  const query = 'SELECT * FROM persona WHERE idPersona = ?';
  db.query(query, [pacienteId], (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);  // Imprime el error en la consola
      return res.status(500).send({ message: 'Error en el servidor' });
    }
    
    if (result.length > 0) {
      res.send(result[0]);  // Enviar solo el primer resultado
    } else {
      res.status(404).send({ message: 'Paciente no encontrado' });
    }
  });
});

// Ruta para obtener los datos de un establecimiento de salud por su id
app.get('/establecimiento/:id', (req, res) => {
  const establecimientosaludId = req.params.id;

  const query = 'SELECT * FROM establecimientosalud WHERE idEstablecimeintoSalud = ?';
  db.query(query, [establecimientosaludId], (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);  // Imprime el error en la consola
      return res.status(500).send({ message: 'Error en el servidor' });
    }
    
    if (result.length > 0) {
      res.send(result[0]);  // Enviar solo el primer resultado
    } else {
      res.status(404).send({ message: 'Paciente no encontrado' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});
