const { Type, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Type model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Type.sync({ force: true }));
    describe("name", () => {
      it("it should create the type with out data", (done) => {
        Type.create({})
          .then(() => done())
          .catch(() => done(new Error("error with the data")));
      });
    });
  });
});

