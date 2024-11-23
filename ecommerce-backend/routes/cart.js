const express = require('express');
const pool = require('../db'); // Database connection
const router = express.Router();

// 1. Get all cart items
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Cart');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).send('Server error');
    }
});

// 2. Push a new item to the cart with item_ids being a integer[]
router.post('/', async (req, res) => {
    try {
        const { item_ids, user_id, status } = req.body;
        
        // Check if the user exists
        const user = await pool.query('SELECT * FROM Users WHERE user_id = $1', [user_id]);
        if (user.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        // Find the cart with that user_id
        const cart = await pool.query('SELECT * FROM Cart WHERE user_id = $1', [user_id]);
        
        // If the cart doesn't exist, create a new cart
        // When creating the cart take the current item_ids and append the new item_ids
        if (cart.rows.length === 0) {
            const result = await pool.query(
                'INSERT INTO Cart (user_id, item_ids) VALUES ($1, $2) RETURNING *',
                [user_id, item_ids]
            );
            return res.status(201).json(result.rows[0]);
        }

        // If the cart exists, update the item_ids
        const new_item_ids = cart.rows[0].item_ids.concat(item_ids);
        const result = await pool.query(
            'UPDATE Cart SET item_ids = $1 WHERE user_id = $2 RETURNING *',
            [new_item_ids, user_id]
        );
    } catch (error) {
        console.error('Error creating cart item:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;