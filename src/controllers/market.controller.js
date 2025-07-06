import db from '../../config/dbConfig.js';

// Tools Management
export const addTool = (req, res) => {
    const { name, category, description, price, stock_quantity, image_url } = req.body;
    const query = `INSERT INTO agricultural_tools (name, category, description, price, stock_quantity, image_url) 
                  VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, category, description, price, stock_quantity, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Tool added successfully', id: result.insertId });
    });
};

export const getTools = (req, res) => {
    const query = 'SELECT * FROM agricultural_tools';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const updateTool = (req, res) => {
    const { id } = req.params;
    const { name, category, description, price, stock_quantity, image_url } = req.body;
    const query = `UPDATE agricultural_tools 
                  SET name = ?, category = ?, description = ?, price = ?, stock_quantity = ?, image_url = ? 
                  WHERE id = ?`;
    db.query(query, [name, category, description, price, stock_quantity, image_url, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Tool not found' });
        res.json({ message: 'Tool updated successfully' });
    });
};

// Seeds/Saplings Management
export const addSeedSapling = (req, res) => {
    const { name, category, description, price, stock_quantity, planting_season, image_url } = req.body;
    const query = `INSERT INTO seeds_saplings (name, category, description, price, stock_quantity, planting_season, image_url) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, category, description, price, stock_quantity, planting_season, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Seed/Sapling added successfully', id: result.insertId });
    });
};

export const getSeedsSaplings = (req, res) => {
    const query = 'SELECT * FROM seeds_saplings';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const updateSeedSapling = (req, res) => {
    const { id } = req.params;
    const { name, category, description, price, stock_quantity, planting_season, image_url } = req.body;
    // Use category as type for seeds table
    const query = `UPDATE seeds_saplings 
                  SET name = ?, type = ?, description = ?, price = ?, stock_quantity = ?, planting_season = ?, image_url = ? 
                  WHERE id = ?`;
    db.query(query, [name, category, description, price, stock_quantity, planting_season, image_url, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Seed/Sapling not found' });
        res.json({ message: 'Seed/Sapling updated successfully' });
    });
};

// Farmer Products Management
export const addFarmerProduct = (req, res) => {
    const { farmer_id, name, category, description, price, quantity, unit, harvest_date, image_url } = req.body;
    const query = `INSERT INTO farmer_products (farmer_id, name, category, description, price, quantity, unit, harvest_date, image_url) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [farmer_id, name, category, description, price, quantity, unit, harvest_date, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    });
};

export const getFarmerProducts = (req, res) => {
    const query = 'SELECT fp.*, u.name as farmer_name FROM farmer_products fp JOIN users u ON fp.farmer_id = u.id WHERE fp.status = "available"';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const updateFarmerProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, description, price, quantity, unit, harvest_date, image_url } = req.body;
    const query = `UPDATE farmer_products 
                  SET name = ?, category = ?, description = ?, price = ?, quantity = ?, unit = ?, harvest_date = ?, image_url = ? 
                  WHERE id = ?`;
    db.query(query, [name, category, description, price, quantity, unit, harvest_date, image_url, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Farmer product not found' });
        res.json({ message: 'Farmer product updated successfully' });
    });
};

export const getMyProducts = (req, res) => {
    const farmerId = req.user.id; // Assuming user info is attached to req by auth middleware
    const query = 'SELECT * FROM farmer_products WHERE farmer_id = ?';
    db.query(query, [farmerId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
