const axios = require('axios').default;
const { Pokemon, Type } = require('../db');

const getPokemons = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      getPokemonByName(req, res, next);
      return;
    }
    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name', 'id'],
        through: {
          attributes: [],
        },
      },
    });

    const resp = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');

    let allPokemons = [
      ...dbPokemons.map((item) => {
        return { name: item.name, type: item.types, id: item.id };
      }),
    ];
    let pokemonPromise = [];
    for (let i = 0; i < resp.data.results.length; i++) {
      pokemonPromise.push(axios(resp.data.results[i].url));
    }
    let pokemonsApi = await Promise.all(pokemonPromise);
    for (let i = 0; i < pokemonsApi.length; i++) {
      let initialPokemon = {
        name: pokemonsApi[i].data.name,
        id: pokemonsApi[i].data.id,
        image: pokemonsApi[i].data.sprites.other.dream_world.front_default,
        health: pokemonsApi[i].data?.stats[0].base_stat,
        attack: pokemonsApi[i].data?.stats[1].base_stat,
        defense: pokemonsApi[i].data?.stats[2].base_stat,
        speed: pokemonsApi[i].data?.stats[5].base_stat,
        type: [],
      };
      for (let j = 0; j < pokemonsApi[i].data.types.length; j++) {
        const dbTypes = await Type.findOne({
          where: { name: pokemonsApi[i].data.types[j].type.name },
          attributes: ['id', 'name'],
        });
        initialPokemon.type.push(dbTypes);
      }
      allPokemons.push(initialPokemon);
    }
    res.json(allPokemons);
  } catch (error) {
    next(error);
  }
};
// podemos hacer por findByPk(ID) o por findOne
const getPokemon = async (req, res) => {
  let { id } = req.params;
  let x = Number(id);
  let pokemon;

  if (x) {
    const resp = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon = {
      id,
      name: resp.data.name,
      health: resp.data.stats[0].base_stat,
      attack: resp.data.stats[1].base_stat,
      defence: resp.data.stats[2].base_stat,
      speed: resp.data.stats[5].base_stat,
      height: resp.data.height,
      weight: resp.data.weight,
      image: resp.data.sprites.other.dream_world.front_default,
      type: [],
    };
    for (let i = 0; i < resp.data.types.length; i++) {
      const dbTypes = await Type.findOne({
        where: { name: resp.data.types[i].type.name },
        attributes: ['id', 'name'],
      });
      pokemon.type.push(dbTypes);
    }
  } else {
    pokemon = await Pokemon.findOne({ where: { id }, include: Type });
  }
  res.json(pokemon);
};

async function getPokemonByName(req, res, next) {
  try {
    const { name } = req.query;
    let pokemon;
    pokemon = await Pokemon.findOne({ where: { name }, include: Type });
    if (!pokemon) {
      const resp = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      pokemon = {
        id: resp.data.id,
        name: resp.data.name,
        // health: resp.data.stats[0].base_stat,
        // attack: resp.data.stats[1].base_stat,
        // defence: resp.data.stats[2].base_stat,
        // speed: resp.data.stats[5].base_stat,
        // height: resp.data.height,
        // weight: resp.data.weight,
        image: resp.data.sprites.other.dream_world.front_default,
        type: [],
      };
      for (let i = 0; i < resp.data.types.length; i++) {
        const dbTypes = await Type.findOne({
          where: { name: resp.data.types[i].type.name },
          attributes: ['id', 'name'],
        });
        pokemon.type.push(dbTypes);
      }
    }
    res.json([pokemon]);
  } catch (error) {
    const errorWithMessage = new Error('No se encontraron pokemones con ese nombre');
    next(errorWithMessage);
  }
}

const createPokemon = async (req, res) => {
  const { name, health, attack, defence, speed, height, weight, type } = req.body;

  const newPokemon = await Pokemon.create({
    name,
    health,
    attack,
    defence,
    speed,
    height,
    weight,
  });
  const selectedType = await Type.findByPk(type);
  newPokemon.addType([selectedType]);

  res.json(newPokemon.toJSON());
};

const getTypes = async (req, res) => {
  const allTypes = await Type.findAll();
  if (allTypes.length) {
    res.json(allTypes);
    return;
  } else {
    const resp = await axios('https://pokeapi.co/api/v2/type');
    const types = resp.data.results.map((type) => {
      return {
        name: type.name,
      };
    });
    const createdTypes = await Type.bulkCreate(types);
    res.json(createdTypes);
  }
};

module.exports = {
  getPokemons,
  getPokemon,
  getPokemonByName,
  createPokemon,
  getTypes,
};
