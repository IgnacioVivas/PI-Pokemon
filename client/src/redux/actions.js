export const ALL_POKEMONS = 'ALL_POKEMONS';
export const SET_POKEMONS = 'SET_POKEMONS';
export const SET_FILTERED_POKEMONS = 'SET_FILTERED_POKEMONS';
export const GET_A_POKEMON = 'GET_A_POKEMON';

// export const POKEMON = "POKEMON";

export const getAllPokemons = () => {
  //   return { type: ALL_POKEMONS, payload: [] };
  return async (dispatch) => {
    const resp = await fetch('http://localhost:3001/pokemons');
    const data = await resp.json();
    console.log(data);
    dispatch({ type: ALL_POKEMONS, payload: data });
  };
};

export const setPokemon = (pokemons) => {
  return { type: SET_POKEMONS, payload: pokemons };
};

export const setFilteredPokemons = (pokemons) => {
  console.log(pokemons);
  return { type: SET_FILTERED_POKEMONS, payload: pokemons };
};

export const getAPokemon = (name) => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:3001/pokemons?name=${name}`);
    const data = await resp.json();
    console.log(data);
    dispatch({ type: GET_A_POKEMON, payload: data });
  };
};
