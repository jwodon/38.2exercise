// app.js
const express = require('express');
const items = require('./fakeDb');

const app = express();
app.use(express.json());

// GET /items - Returns a list of shopping items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items - Adds a new item to the shopping list
app.post('/items', (req, res) => {
    items.push(req.body);
    res.status(201).json({ added: req.body });
});

// GET /items/:name - Finds and returns a single item by name
app.get('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// PATCH /items/:name - Modifies an existing item
app.patch('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (req.body.name) item.name = req.body.name;
    if (req.body.price) item.price = req.body.price;
    res.json({ updated: item });
});

// DELETE /items/:name - Deletes an item from the list
app.delete('/items/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    items.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
