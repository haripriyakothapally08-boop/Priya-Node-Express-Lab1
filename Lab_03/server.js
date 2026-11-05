const express = require('express');
const connectDB = require('./app');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db;

// GET all books with search, sorting and filtering
app.get('/books', async (req, res) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = req.query;

        const allowedColumns = ['id', 'title', 'author', 'price'];

        const sortColumn = allowedColumns.includes(order_by)
            ? order_by : 'id';

        const sortOrder = order.toUpperCase() === 'DESC'
            ? 'DESC' : 'ASC';

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (!Number.isInteger(pageLimit) || pageLimit <= 0 ||
            !Number.isInteger(pageOffset) || pageOffset < 0) {
            return res.status(400).json({
                message: 'Invalid limit or offset'
            });
        }

        let sql = 'SELECT * FROM books WHERE title LIKE ?';
        const params = [`%${search_q}%`];

        if (min_price !== undefined) {
            const min = Number(min_price);
            if (!Number.isFinite(min)) {
                return res.status(400).json({
                    message: 'Invalid minimum price'
                });
            }
            sql += ' AND price >= ?';
            params.push(min);
        }

        if (max_price !== undefined) {
            const max = Number(max_price);
            if (!Number.isFinite(max)) {
                return res.status(400).json({
                    message: 'Invalid maximum price'
                });
            }
            sql += ' AND price <= ?';
            params.push(max);
        }

        if (min_price !== undefined && max_price !== undefined &&
            Number(min_price) > Number(max_price)) {
            return res.status(400).json({
                message: 'Minimum price cannot exceed maximum price'
            });
        }

        sql += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(pageLimit, pageOffset);

        const books = await db.all(sql, params);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve books'
        });
    }
});

// GET a single book
app.get('/books/:bookId', async (req, res) => {
    try {
        const book = await db.get(
            'SELECT * FROM books WHERE id = ?',
            [req.params.bookId]
        );

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve book'
        });
    }
});

// POST a new book
app.post('/books', async (req, res) => {
    try {
        const { title, author, price } = req.body;

        if (!title || !author || price === undefined ||
            typeof price !== 'number' || !Number.isFinite(price) ||
            price < 0) {
            return res.status(400).json({
                message: 'Title, author and a valid non-negative numeric price are required'
            });
        }

        const result = await db.run(
            'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
            [title, author, price]
        );

        res.status(201).json({
            message: 'Book added successfully',
            bookId: result.lastID
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add book'
        });
    }
});

// PUT update a book
app.put('/books/:bookId', async (req, res) => {
    try {
        const { title, author, price } = req.body;

        if (!title || !author || typeof price !== 'number' ||
            !Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                message: 'Valid title, author and price are required'
            });
        }

        const result = await db.run(
            'UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?',
            [title, author, price, req.params.bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to update book'
        });
    }
});

// DELETE a book
app.delete('/books/:bookId', async (req, res) => {
    try {
        const result = await db.run(
            'DELETE FROM books WHERE id = ?',
            [req.params.bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete book'
        });
    }
});

// Start server after database connection
async function startServer() {
    try {
        db = await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

startServer();