# Wagbook API Coding Challenge

Welcome to the Wagbook API team! This short coding exercise is designed to give us a sense of your skills in a realistic Node.js environment.

This challenge should take anywhere from 10-30 minutes.

## Setup

1.  Ensure you have Node.js (v18 or later) and npm installed.
2.  Open your terminal in this directory.
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```

## Your Tasks

Your instructions are located as comments inside the `index.js` file. You will need to:

1.  **Implement a new `GET /status` healthcheck endpoint.**
2.  **Fix a bug in the existing `GET /pets/:id` endpoint.**
3.  **Implement a new `GET /pets/owner/:ownerId` endpoint.**
4.  **Implement a WebSocket countdown.**

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

- `curl http://localhost:3000/status`
- `curl http://localhost:3000/pets/p1`
- `curl http://localhost:3000/pets/p99`
- `curl http://localhost:3000/pets/owner/u1`
- `curl http://localhost:3000/pets/owner/u3`

## Submission

Once you are finished, please zip this directory (excluding the `node_modules` folder) and send it back to us.
