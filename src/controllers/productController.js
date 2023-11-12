const Product = require('../models/product');
const fs = require('fs');
//const multer = require('multer');
//const upload = multer({ storage: multer.memoryStorage() }); // Almacena la imagen en memoria
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      Description: req.body.Description,
      Category: req.body.Category,
      Amount: req.body.Amount,
      PurchasePrice: req.body.PurchasePrice,
      SalePrice: req.body.SalePrice,
      Image: req.file ? 'uploads/images/' + req.file.filename : null,
    });

    res.json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
};
/*const createProduct = async (req, res) => {
  try {
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
  } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).send('Error interno del servidor');
  }
};*/

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    if (products.length === 0) {
      // No hay productos, envía una respuesta apropiada
      res.status(404).json({ message: 'No hay productos disponibles' });
    } else {
      // Hay productos, envía la lista de productos
      //res.json(products);
      res.render('products', { products });
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};


const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = productId ? await Product.findByPk(productId) : null;

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (product) {
      // Almacenar la imagen actual antes de la actualización
      const oldImage = product.Image;

      // Actualizar solo los campos que se proporcionan en la solicitud
      if (req.body && Object.keys(req.body).length > 0) {
        // Actualizar la imagen solo si se proporciona un nuevo archivo
        const newImage = req.file ? 'uploads/images/' + req.file.filename : product.Image;

        // Actualizar otros campos
        await product.update({
          Description: req.body.Description || product.Description,
          Category: req.body.Category || product.Category,
          Amount: req.body.Amount || product.Amount,
          PurchasePrice: req.body.PurchasePrice || product.PurchasePrice,
          SalePrice: req.body.SalePrice || product.SalePrice,
          Image: newImage,
        });

        // Verificar la existencia de la imagen anterior
        if (req.file && oldImage && fs.existsSync(oldImage)) {
          // Eliminar la imagen anterior
          fs.unlinkSync(oldImage);
          console.log('Imagen anterior eliminada:', oldImage);
        }
      }
      // Después de la actualización, redirige a la página de lista de productos
      res.redirect('/products');
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const deleteProduct = async (req, res) => {
  // Implementa la lógica para eliminar un producto
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (product) {
      await product.destroy();
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};