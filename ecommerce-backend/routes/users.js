const express = require('express');
const pool = require('../db'); // Database connection
const router = express.Router();

// 1. Get all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
});

// 2. Get a user by ID
router.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM Users WHERE user_id = $1', [user_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

// 3. Create a new user
router.post('/', async (req, res) => {
    try {
        const { phone_number, email, first_name, last_name } = req.body;
        const createdAt = new Date(); // Set the current timestamp for created_at
        const result = await pool.query(
            'INSERT INTO Users (phone_number, email, created_at, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [phone_number, email, createdAt, first_name, last_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
});

// 4. Update a user by ID
router.put('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const { phone_number, email, first_name, last_name } = req.body;
        const result = await pool.query(
            'UPDATE Users SET phone_number = $1, email = $2, first_name = $3, last_name = $4 WHERE user_id = $5 RETURNING *',
            [phone_number, email, first_name, last_name, user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
});

// 5. Delete a user by ID
router.delete('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [user_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
