
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "books.db");
let db;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
      );
    `);

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

// Get all books
app.get("/books/", async (req, res) => {
  const books = await db.all("SELECT * FROM book");
  res.status(200).json(books);
});

// Get one book
app.get("/books/:bookId/", async (req, res) => {
  const book = await db.get(
    "SELECT * FROM book WHERE id = ?",
    [req.params.bookId]
  );

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
});

// Add a book
app.post("/books/", async (req, res) => {
  const { title, author, price, pages } = req.body;

  const result = await db.run(
    `INSERT INTO book (title, author, price, pages)
     VALUES (?, ?, ?, ?)`,
    [title, author, price, pages]
  );

  res.status(201).json({
    message: "Book added successfully",
    bookId: result.lastID,
  });
});

// Update a book
app.put("/books/:bookId/", async (req, res) => {
  const { title, author, price, pages } = req.body;

  const result = await db.run(
    `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?`,
    [title, author, price, pages, req.params.bookId]
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json({ message: "Book updated successfully" });
});

// Delete a book
app.delete("/books/:bookId/", async (req, res) => {
  const result = await db.run(
    "DELETE FROM book WHERE id = ?",
    [req.params.bookId]
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json({ message: "Book deleted successfully" });
});

initializeDBAndServer();
