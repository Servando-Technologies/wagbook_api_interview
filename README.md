# Wagbook API Coding Challenge

Welcome to the Wagbook API team! This short coding exercise is designed to give us a sense of some basic REST API and realtime websocket skills in a realistic Node.js environment.

This challenge should take anywhere from 15-30 minutes.

## Setup

1.  Ensure you have Node.js (v18 or later) and npm installed.
2.  Open your terminal in this directory.
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```

## Your Tasks

Your instructions are located as comments inside the `index.js` file. You will need to:

1.  **Implement a `GET /status` healthcheck endpoint.**
2.  **Implement a `GET /pets/:id` endpoint.**
3.  **Implement a `POST /pets` endpoint to add a new pet.**
4.  **Implement a `PUT /pets/:id` endpoint to update a pet.**
5.  **Implement a `POST /owners` endpoint to add a new owner.**
6.  **Implement a `GET /pets/owner/:ownerId` endpoint to find pets by owner.**
7.  **Implement a `GET /owner/:ownerId` endpoint to find an owner.**
8.  **Implement a WebSocket countdown.**

All the details and requirements are in the comments.

## Running the Application

To start the server, run:

```bash
npm start
```

## Running Tests

We have included a test suite to help you verify your work. To run the tests, use:

```bash
npm test
```

## Validation a Submission

if you have a solution file, you can run the tests with the following command:

```
USE_FILE=solution npm test
```

The tests cover all the requirements in the tasks. We encourage you to use them to check your progress.

## Testing with cURL

If you prefer to test manually, you can use tools like `curl` or Postman:

- **Healthcheck:**
  `curl http://localhost:3000/status`

- **Get a specific pet:**
  `curl http://localhost:3000/pets/p1`
  `curl http://localhost:3000/pets/p99` (Not Found case)

- **Add a new pet:**
  `curl -X POST -H "Content-Type: application/json" -d '{"name": "Rex", "species": "Dog", "ownerId": "u1"}' http://localhost:3000/pets`

- **Update a pet:**
  `curl -X PUT -H "Content-Type: application/json" -d '{"name": "Fido Updated"}' http://localhost:3000/pets/p1`

- **Add a new owner:**
  `curl -X POST -H "Content-Type: application/json" -d '{"name": "David"}' http://localhost:3000/owners`

- **Get pets by owner:**
  `curl http://localhost:3000/pets/owner/u1`
  `curl http://localhost:3000/pets/owner/u99` (Not Found case)

- **Get a specific owner:**
  `curl http://localhost:3000/owner/u1`
  `curl http://localhost:3000/owner/u99` (Not Found case)

## Submission

Once you are finished, please zip this directory (excluding the `node_modules` folder) and send it back to us.
