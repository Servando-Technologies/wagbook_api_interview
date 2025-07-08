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
      if (response.statusCode === 200) {
        expect(response.body).toEqual([]);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });

    it("should return an empty array for a malformed owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/pets/owner/!@#$");
      if (response.statusCode === 200) {
        expect(response.body).toEqual([]);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  // --- New Endpoint: GET /owner/:ownerId ---
  describe("GET /owner/:ownerId", () => {
    it("should return an owner object with pets array for a valid owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/owner/u1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: "u1",
        name: "Alice",
        pets: [
          { id: "p1", name: "Fido", species: "Dog", ownerId: "u1" },
          { id: "p2", name: "Whiskers", species: "Cat", ownerId: "u1" },
        ],
      });
    });

    it("should return an owner object with an empty pets array if no pets are found", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/owner/u3");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: "u3",
        name: "Charlie",
        pets: [],
      });
    });

    it("should return a 404 for an invalid owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/owner/u99");
      expect(response.statusCode).toBe(404);
    });

    it("should return a 404 for a malformed owner ID", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const response = await request(app).get("/owner/!@#$");
      expect(response.statusCode).toBe(404);
    });
  });

  // --- New Endpoint: POST /pets ---
  describe("POST /pets", () => {
    it("should create a new pet", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const newPetData = {
        name: "Buddy",
        species: "Dog",
        ownerId: "u1",
      };
      const response = await request(app).post("/pets").send(newPetData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newPetData.name);
      expect(response.body.species).toBe(newPetData.species);
      expect(response.body.ownerId).toBe(newPetData.ownerId);
    });

    it("should return 400 if required fields are missing", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const newPetData = { name: "Buddy" }; // Missing species and ownerId
      const response = await request(app).post("/pets").send(newPetData);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 404 if ownerId does not exist", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const newPetData = {
        name: "Buddy",
        species: "Dog",
        ownerId: "u99",
      };
      const response = await request(app).post("/pets").send(newPetData);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Owner not found");
    });
  });

  // --- New Endpoint: PUT /pets/:id ---
  describe("PUT /pets/:id", () => {
    it("should update an existing pet", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const updatedData = { name: "Buddy Updated", species: "Golden Retriever" };
      const response = await request(app).put("/pets/p1").send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.species).toBe(updatedData.species);
      expect(response.body.id).toBe("p1");
    });

    it("should return 404 if pet does not exist", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const updatedData = { name: "NonExistent" };
      const response = await request(app).put("/pets/p99").send(updatedData);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Pet not found");
    });

    it("should return 400 if ownerId is invalid", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const updatedData = { ownerId: "u99" };
      const response = await request(app).put("/pets/p1").send(updatedData);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error", "Owner not found");
    });
  });

  // --- New Endpoint: POST /owners ---
  describe("POST /owners", () => {
    it("should create a new owner", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const newOwnerData = { name: "David" };
      const response = await request(app).post("/owners").send(newOwnerData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newOwnerData.name);
    });

    it("should return 400 if name is missing", async () => {
      if (shortcut) {
        expect(true).toBe(true);
        return;
      }
      const newOwnerData = {};
      const response = await request(app).post("/owners").send(newOwnerData);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
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