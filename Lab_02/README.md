# Lab 2: SQLite Database and CRUD Routes

## Student Details

 **Name:** Kothapally HariPriya
 **Registration Number:** 252U1R9075
 **Section:** GENAI 2A
 **Course:** Backend Development Fundamentals
 **Lab Number:** 02

## Live Link

Not applicable (Local Script Lab).

## Project Description

This project demonstrates how to create a REST API using Node.js, Express.js, and SQLite. It performs CRUD operations (Create, Read, Update, and Delete) on book records stored in an SQLite database named `books.db`.

## Technologies Used

 Node.js
 Express.js
 SQLite
 JavaScript
 VS Code
 Postman

## How to Run the Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm run dev
```

### 3. Server URL

```text
http://localhost:3000
```

### 4. Database

Database file: `books.db`

The database stores book details such as ID, title, author, price, and pages.

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update book details |
| DELETE | `/books/:bookId/` | Delete a book |

## Scripts

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the server using Nodemon |
| `npm start` | Starts the server using Node.js |

## Screenshots

Add your Postman screenshots below:

1. GET all books
2. GET book by ID
3. POST – Add a new book
4. PUT – Update book details
5. DELETE – Delete a book

Save the screenshots in a folder named `screenshots`.

## Problems Faced and Solutions

**1. SQLite command not recognized**

 Problem: The `sqlite3` command was not recognized in PowerShell.
 Solution: Used the SQLite extension in VS Code to work with the database.

**2. Database connection issue**

 Problem: The database was not connecting properly.
 Solution: Used the `sqlite` and `sqlite3` packages to connect the database with Node.js.

**3. Postman localhost connection error**

 Problem: Postman Cloud Agent could not connect to localhost.
 Solution: Used the Postman Desktop Agent to send local API requests.

**4. Server not starting properly**

 Problem: Nodemon showed a clean exit.
 Solution: Added the database connection and Express server startup code in `app.js`.

## Conclusion

This lab helped me understand how to connect an SQLite database with Node.js and Express.js. I learned how to create REST API endpoints and perform CRUD operations on book records using Postman.