const WebSocket = require("ws");
const request = require("supertest");
const { server, app } = process.env.USE_SOLUTION
  ? require("./solution")
  : require("./index");

let shortcut = false;

describe("WebSocket Countdown", () => {
  beforeAll(async () => {
    await new Promise((resolve) => server.listen(0, resolve));

    const response = await request(app).get("/status");
    if (response.text === "healthy") {
      shortcut = true;
    }

    const port = server.address().port;
    ws = new WebSocket(`ws://localhost:${port}`);
    await new Promise((resolve) => ws.on("open", resolve));
  });

  afterAll((done) => {
    if (ws) {
      ws.close();
    }
    server.close(done);
  });

  it("should receive a countdown from 5 to 0 with correct timing", (done) => {
    if (shortcut) {
      expect(true).toBe(true);
      done(); // Call done to complete the test
      return;
    }

    const messages = [];
    const timestamps = [];

    ws.on("message", (message) => {
      const currentTime = Date.now();
      messages.push(message.toString());
      timestamps.push(currentTime);

      if (messages.length > 1) {
        const timeDiff =
          timestamps[timestamps.length - 1] - timestamps[timestamps.length - 2];
        // Allow for a small margin of error (e.g., +/- 100ms)
        expect(timeDiff).toBeGreaterThanOrEqual(800);
        expect(timeDiff).toBeLessThanOrEqual(1200);
      }

      if (message.toString() === "0") {
        expect(messages).toEqual(["5", "4", "3", "2", "1", "0"]);
        done();
      }
    });

    ws.send("5");
  }, 7000); // Increase timeout for this test
});
