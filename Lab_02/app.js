const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json()); // Required to parse incoming JSON in request bodies

let db;
const dbPath = path.join(__dirname, "books.db");

// Initialize Database Connection and Start Server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// ==========================================
// API ROUTES (GET, POST, PUT, DELETE)
// ==========================================

// 1. GET: Retrieve all books
app.get("/books/", async (req, res) => {
  try {
    const booksQuery = `SELECT * FROM book;`;
    const books = await db.all(booksQuery);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// 2. GET: Retrieve a single book by ID
app.get("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const book = await db.get(getBookQuery, [bookId]);
    
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

// 3. POST: Add a new book
app.post("/books/", async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;
    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    const dbResponse = await db.run(addBookQuery, [title, author, price, pages]);
    res.status(201).json({
      message: "Book added successfully",
      bookId: dbResponse.lastID,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// 4. PUT: Update an existing book by ID
app.put("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;
    
    const updateBookQuery = `
      UPDATE book 
      SET title = ?, author = ?, price = ?, pages = ? 
      WHERE id = ?;
    `;
    const dbResponse = await db.run(updateBookQuery, [title, author, price, pages, bookId]);
    
    if (dbResponse.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// 5. DELETE: Remove a book by ID
app.delete("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const deleteBookQuery = `DELETE FROM book WHERE id = ?;`;
    const dbResponse = await db.run(deleteBookQuery, [bookId]);
    
    if (dbResponse.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});