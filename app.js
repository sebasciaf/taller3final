const express = require('express');
const path = require('path');
const { promisify } = require('util');
const connection = require('./db');

const app = express();
const port = process.env.PORT || 3000;

const query = promisify(connection.query).bind(connection);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas

// GET /getProducts
app.get('/getProducts', async (req, res) => {
  try {
    const results = await query('SELECT * FROM products');
    res.status(200).json({ data: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// POST /createProduct
app.post('/createProduct', async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const results = await query('INSERT INTO products (name, category, description, price) VALUES (?,?,?,?)', [name, category, description, price]);
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// PUT /updateProduct/:id
app.put('/updateProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price } = req.body;
    const results = await query('UPDATE products SET name = ?, category = ?, description = ?, price = ? WHERE id = ?', [name, category, description, price, id]);
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// DELETE /deleteProduct/:id
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const results = await query('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
