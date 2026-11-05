# Lab 3: REST API, Query Parameters, Validation and Debugging

## Student Details

- **Name:** Kothapally HariPriya
- **Registration Number:** 252U1R9075
- **Section:** GENAI 2A
- **Subject:** Backend Development Fundamentals
- **Lab Number:** 03

## Project Description

This lab focuses on developing a REST API using Node.js, Express.js, and SQLite. It demonstrates CRUD operations, query parameters, sorting, pagination, price filtering, input validation, and error handling.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- npm
- Postman
- Visual Studio Code

## Project Folder Structure

```text
lab-03/
│
├── server.js
├── database.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
│
└── screenshots/
    ├── get-books.png
    ├── search.png
    ├── sorting.png
    ├── pagination.png
    ├── price-filter.png
    ├── post-success.png
    ├── put-success.png
    ├── delete-success.png
    ├── validation-error.png
    └── not-found.png
```

## Installation and Setup

1. Open the project folder in Visual Studio Code.
2. Open the terminal.
3. Install the required packages:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. The server runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:bookId` | Get a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:bookId` | Update a book |
| DELETE | `/books/:bookId` | Delete a book |

## Query Parameters

| Parameter | Description | Example |
|---|---|---|
| `search_q` | Search books by title | `?search_q=Python` |
| `order_by` | Sort by a column | `?order_by=price` |
| `order` | Sort ascending or descending | `?order=DESC` |
| `limit` | Number of records | `?limit=5` |
| `offset` | Skip records | `?offset=0` |
| `min_price` | Minimum book price | `?min_price=100` |
| `max_price` | Maximum book price | `?max_price=500` |

### Example Requests

**Search:**
```text
GET /books?search_q=Python
```

**Sorting (highest to lowest):**
```text
GET /books?order_by=price&order=DESC
```

**Pagination:**
```text
GET /books?limit=5&offset=0
```

**Price Filtering:**
```text
GET /books?min_price=100&max_price=500
```

## Input Validation and Error Handling

- Checks whether title and author are provided.
- Checks whether price is a valid non-negative number.
- Returns status code `400` for invalid input.
- Returns status code `404` when a book is not found.
- Returns status code `201` when a book is successfully created.
- Uses consistent JSON error messages.
- Uses parameterized SQL queries to prevent SQL injection.

## Postman Testing Screenshots

The following screenshots demonstrate the API testing results:

1. `get-books.png` – Displaying all books.
2. `search.png` – Searching books by title.
3. `sorting.png` – Sorting prices from highest to lowest.
4. `pagination.png` – Testing limit and offset.
5. `price-filter.png` – Filtering books by price.
6. `post-success.png` – Successfully adding a book.
7. `put-success.png` – Successfully updating a book.
8. `delete-success.png` – Successfully deleting a book.
9. `validation-error.png` – Testing invalid input.
10. `not-found.png` – Testing a book ID that does not exist.

## Learning Outcomes

Through this lab, I learned how to:

- Create REST API endpoints using Express.js.
- Perform CRUD operations using SQLite.
- Use query parameters for searching, sorting, and filtering.
- Implement pagination using limit and offset.
- Validate user input.
- Handle errors and debug common backend issues.
- Test API endpoints using Postman.

## Deployment

**Deployment Link:**  https://priya-node-express-lab1-2.onrender.com/

## Conclusion

This lab helped me understand how REST APIs work in backend development. I gained practical experience in connecting SQLite with Express.js, performing CRUD operations, implementing query parameters, validating input, and handling errors. Testing the API using Postman improved my understanding of backend development and debugging.
