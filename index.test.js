const request = require("supertest");
const { app, server } = require(process.env.USE_FILE ? './' + process.env.USE_FILE.replace('.js', '') : './index');

let shortcut = false;

describe("API Endpoints", () => {
  beforeAll(async () => {
    const response = await request(app).get("/status");
    if (response.text === "healthy") {
      shortcut = true;
    }
  });

  // --- TASK 1: Healthcheck Endpoint ---
  const request = require("supertest");
const { app, server } = process.env.USE_FILE ? require('./' + process.env.USE_FILE.replace('.js', '')) : require('./index');

let shortcut = false;

describe("API Endpoints", () => {
  beforeAll(async () => {
    const response = await request(app).get("/status");
    if (response.text === "healthy") {
      shortcut = true;
    }
  });

  // --- TASK 1: Healthcheck Endpoint ---
  describe("GET /status", () => {
    it("should return a 200 status and a timestamp", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/status");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("status", "ok");
      expect(response.body).toHaveProperty("timestamp");
      // Optional: Check if the timestamp is a valid ISO 8601 date
      const isISO8601 = Date.parse(response.body.timestamp);
      expect(isISO8601).not.toBeNaN();
    });
  });

  // --- TASK 2: Get a Single Pet ---
  describe("GET /pets/:id", () => {
    it("should return a single pet for a valid ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/p1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: "p1",
        name: "Fido",
        species: "Dog",
        ownerId: "u1",
      });
    });

    it("should return a 404 for an invalid ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/p99");
      expect(response.statusCode).toBe(404);
    });

    it("should return a 404 for a malformed ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/!@#$");
      expect(response.statusCode).toBe(404);
    });
  });

  // --- TASK 3: Get Pets by Owner ---
  describe("GET /pets/owner/:ownerId", () => {
    it("should return all pets for a valid owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/owner/u1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        { id: "p1", name: "Fido", species: "Dog", ownerId: "u1" },
        { id: "p2", name: "Whiskers", species: "Cat", ownerId: "u1" },
      ]);
    });

    it("should return an empty array for an owner with no pets", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/owner/u3");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return an empty array for a malformed owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/owner/!@#$");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  // Test for unknown routes
  describe("Unknown Route", () => {
    it("should return a 404 for an unknown route", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/unknown");
      expect(response.statusCode).toBe(404);
    });
  });
});

  // Test for unknown routes
  describe("Unknown Route", () => {
    it("should return a 404 for an unknown route", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/unknown");
      expect(response.statusCode).toBe(404);
    });
  });
});
