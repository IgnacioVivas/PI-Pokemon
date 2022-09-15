const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getPokemons,
  createPokemon,
  getPokemon,
  getTypes,
} = require("../controllers/pokemons.controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);
router.get("/pokemons/:id", getPokemon);
router.post("/pokemons", createPokemon);
router.get("/types", getTypes);

module.exports = router;

