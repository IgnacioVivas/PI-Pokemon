/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("Should get 200", () =>
      agent.get("/pokemons").expect(200).expect("Content-Type", /json/));
    it("Should get 200 and return the correct pokemon", () =>
      agent
        .get("/pokemons?name=Pikachu")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.name).to.eql("Pikachu");
        }));
    it("Should get 500 when the pokemon does not exist", () =>
      agent.get("/pokemons?name=elzorro").expect(500));
  });
});

