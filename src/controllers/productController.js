const db = require('../config/db');

// 1. සියලුම Products ලබා ගැනීම (GET /api/products)
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. ID එක මගින් එක Product එකක් ලබා ගැනීම (GET /api/products/:id)
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product dynamic not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. අලුත් Product එකක් එකතු කිරීම (POST /api/products)
exports.createProduct = async (req, res) => {
  const { title, price, description } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: 'Title and price are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO products (title, price, description) VALUES (?, ?, ?)',
      [title, price, description || '']
    );
    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId,
      product: { title, price, description }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Product එකක් Update කිරීම (PUT /api/products/:id)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, description } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?',
      [title, price, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Product එකක් Delete කිරීම (DELETE /api/products/:id)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};