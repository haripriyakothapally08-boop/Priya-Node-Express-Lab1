# Lab 1: Node.js and Express Server

## 1. Student Details

 **Name:** Kothapally HariPriya
 **Registration Number:** 252U1R9075
-**Section:** GEN AI-2A
 **Course:** Backend Development Fundamentals
 **Lab Number:** 01

## 2. Live Link

**Deployment URL:** https://priya-node-express-lab1.onrender.com


Update this section with the public deployment URL after successfully deploying the server.

## 3. GitHub Repository

**GitHub Link:** 
## 4. Objective

To set up a Node.js project, create a basic HTTP server using the built-in `http` module, and build an Express server with multiple routes and appropriate HTTP status codes.

## 5. Technologies Used

1. Node.js
2. Express.js
3. JavaScript
4. npm
5. Visual Studio Code
6. Git and GitHub

## 6. Project Structure


priya_Node_Express_Lab1/
├── Screenshots/
│   ├── home.png
│   ├── about.png
│   ├── time.png
│   └── not-found.png
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Note: Include `server-http.js` in the project structure only if you have created that file.

## 7. Installation and Setup

### 7.1 Prerequisites

- Node.js and npm installed
- Visual Studio Code or another code editor
- Git installed for GitHub submission

### 7.2 Installation Steps

1. Clone the GitHub repository or open the project folder in VS Code.
2. Open the project folder in the terminal.
3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the Express server:

   ```bash
   node server.js
   ```

5. Open the following URL in your browser:
   `http://localhost:3000`

6. Stop the server by pressing `Ctrl + C` in the terminal.

### 7.3 Run the Basic HTTP Server

If the project includes `server-http.js`, run the basic HTTP server using:

```bash
node server-http.js
```

Stop the running server before starting another server if both use the same port.

## 8. Endpoints

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| GET | `/` | Returns a welcome message | 200 OK |
| GET | `/about` | Returns the student's name and section | 200 OK |
| GET | `/time` | Returns the current date and time | 200 OK |
| GET | `/anything` | Demonstrates an unknown route | 404 Not Found |

The `/anything` path is an example of an unknown route. Other undefined paths should also return a 404 response.

## 9. Screenshots

### 9.1 Home Route

Displays the welcome message.

![Home Route](Screenshots/home.png)

### 9.2 About Route

Displays the student's name and section.

![About Route](Screenshots/about.png)

### 9.3 Time Route

Displays the current date and time.

![Time Route](Screenshots/time.png)

### 9.4 Unknown Route

Displays the 404 Page Not Found response.

![404 Route](Screenshots/not-found.png)

## 10. HTTP Status Codes

- **200 OK:** The request was successful.
- **404 Not Found:** The requested route does not exist.

## 11. Viva Questions

### 11.1 What is the difference between `package.json` and `node_modules`?

`package.json` stores project metadata, scripts, and dependency information. `node_modules` contains the installed packages required by the project.

### 11.2 What does `app.listen()` do?

`app.listen()` starts the Express server and makes it listen for incoming requests on a specified port.

### 11.3 What do `request` and `response` represent?

The request contains information about the incoming HTTP request. The response is used to send data and status codes back to the client.

## 12. Problems Faced and Solutions

Document the actual problems encountered while completing the lab and how they were solved.

For example, if an npm security error occurred in PowerShell, describe the error and the solution only after confirming it has been resolved.

## 13. Git and Repository Notes

- The `.gitignore` file should exclude `node_modules/` and `.env`.
- The `node_modules/` directory should not be committed to GitHub.
- Screenshots should be stored in the `Screenshots/` directory.
- The project should be submitted through the course GitHub repository.