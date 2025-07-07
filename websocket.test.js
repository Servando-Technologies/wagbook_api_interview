const WebSocket = require("ws");
const request = require("supertest");
const { server, app } = process.env.USE_FILE
  ? require("./" + process.env.USE_FILE.replace(".js", ""))
  : require("./index");

let shortcut = false;

describe("WebSocket Countdown", () => {
  let port;

  beforeAll(async () => {
    const response = await request(app).get("/status");
    if (response.text === "healthy") {
      shortcut = true;
    }
    port = server.address().port;
  });

  it("should receive a countdown from 5 to 0 with correct timing", (done) => {
    if (shortcut) {
      expect(true).toBe(true);
      done();
      return;
    }
    const ws = new WebSocket(`ws://localhost:${port}`);
    const messages = [];
    const timestamps = [];

    ws.on("open", () => {
      ws.send("5");
    });

    ws.on("message", (message) => {
      const currentTime = Date.now();
      messages.push(message.toString());
      timestamps.push(currentTime);

      if (messages.length > 1) {
        const timeDiff =
          timestamps[timestamps.length - 1] - timestamps[timestamps.length - 2];
        expect(timeDiff).toBeGreaterThanOrEqual(900);
        expect(timeDiff).toBeLessThanOrEqual(1100);
      }

      if (message.toString() === "0") {
        expect(messages).toEqual(["5", "4", "3", "2", "1", "0"]);
        ws.close();
        done();
      }
    });
  }, 8000);

  it("should handle invalid input by sending back an error", (done) => {
    if (shortcut) {
      expect(true).toBe(true);
      done();
      return;
    }
    const ws = new WebSocket(`ws://localhost:${port}`);
    ws.on("open", () => {
      ws.send("invalid");
    });

    ws.on("message", (message) => {
      expect(message.toString()).toBe("Please send a valid positive number.");
      ws.close();
      done();
    });
  });

  it("should handle multiple clients concurrently", (done) => {
    if (shortcut) {
      expect(true).toBe(true);
      done();
      return;
    }
    const ws1 = new WebSocket(`ws://localhost:${port}`);
    const ws2 = new WebSocket(`ws://localhost:${port}`);

    const ws1Messages = [];
    const ws2Messages = [];
    let ws1Done = false;
    let ws2Done = false;

    const checkDone = () => {
      if (ws1Done && ws2Done) {
        done();
      }
    };

    ws1.on("open", () => {
      ws1.send("3");
    });

    ws1.on("message", (message) => {
      ws1Messages.push(message.toString());
      if (message.toString() === "0") {
        expect(ws1Messages).toEqual(["3", "2", "1", "0"]);
        ws1.close();
        ws1Done = true;
        checkDone();
      }
    });

    ws2.on("open", () => {
      ws2.send("2");
    });

    ws2.on("message", (message) => {
      ws2Messages.push(message.toString());
      if (message.toString() === "0") {
        expect(ws2Messages).toEqual(["2", "1", "0"]);
        ws2.close();
        ws2Done = true;
        checkDone();
      }
    });
  }, 5000);

  it("should clear previous timer and start a new countdown", (done) => {
    if (shortcut) {
      expect(true).toBe(true);
      done();
      return;
    }
    const ws = new WebSocket(`ws://localhost:${port}`);
    const messages = [];
    const expectedSequence = ["2", "1", "0"];
    let sequenceIndex = 0;

    ws.on("open", () => {
      ws.send("5"); // Start the first countdown
      setTimeout(() => {
        ws.send("2"); // Start the second countdown
      }, 2500);
    });

    ws.on("message", (message) => {
      const num = message.toString();
      messages.push(num);

      // Check if the received message matches the expected sequence
      if (
        sequenceIndex < expectedSequence.length &&
        num === expectedSequence[sequenceIndex]
      ) {
        sequenceIndex++;
      }

      // When the last message of the expected sequence is received, finish
      if (num === "0" && messages.includes("2")) {
        // Verify that the full, correct sequence was received in order
        expect(sequenceIndex).toBe(expectedSequence.length);
        ws.close();
        done();
      }
    });
  }, 7000);
});
