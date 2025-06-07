const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());

// Configurar el transporte SMTP con Mailhog
const transporter = nodemailer.createTransport({
  host: 'mailhog',
  port: 1025,
  secure: false
});

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'usuario',
  password: process.env.DB_PASSWORD || 'usuario123',
  database: process.env.DB_NAME || 'empresa'
};

let connection;

// Initialize database connection
async function initializeDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Successfully connected to MySQL');
    
    // Create a test table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized');
    // Iniciar el servidor solo después de la conexión exitosa
    app.listen(port, () => {
      console.log(`Backend API listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initializeDatabase();

// CRUD Routes
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    await connection.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.params.id]
    );
    res.json({ id: req.params.id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await connection.execute(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enviar correo de bienvenida
app.post('/users/:id/send-welcome-email', async (req, res) => {
  try {
    // Buscar usuario por ID
    const [results] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Configurar el correo
    const mailOptions = {
      from: '"Soporte" <soporte@empresa.com>',
      to: user.email,
      subject: '¡Bienvenido!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hola ${user.name}</h2>
          <p>Gracias por registrarte en nuestro sitio.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Este es un correo automático, por favor no responder.
          </p>
        </div>
      `
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    res.json({ mensaje: 'Correo de bienvenida enviado', info });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Error al enviar el correo' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'API is running',
    database: connection ? 'Connected' : 'Disconnected'
  });
});
