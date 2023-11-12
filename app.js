const express = require('express');
const sequelize = require('./src/database'); // Ajusta la ruta según la ubicación real

const methodOverride = require('method-override');

const productRoutes = require('./src/routes/productRoutes');
const path = require('path');  // Agrega esta línea para importar el módulo path
const app = express();
const port = 3000;
// Middleware para interpretar el método PUT
app.use(methodOverride('_method'));
const bodyParser = require('body-parser');
const multer = require('multer');
// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());
// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(express.json());
// Sirve los archivos estáticos desde la carpeta de imágenes
// Sirve los archivos estáticos desde la carpeta de imágenes
app.use('/uploads/images', express.static(path.join(__dirname, './src/uploads/images')));
app.use('/products', productRoutes(upload));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, './src/views')); // Set the views directory

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});