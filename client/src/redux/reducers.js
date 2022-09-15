import { ALL_POKEMONS, SET_FILTERED_POKEMONS, SET_POKEMONS, GET_A_POKEMON } from './actions';

let initialState = { allPokemons: [], allPokemonsBackUp: [] };
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        allPokemonsBackUp: action.payload,
      };
    case SET_POKEMONS:
      return { ...state, allPokemons: action.payload };
    case SET_FILTERED_POKEMONS:
      return { ...state, allPokemons: action.payload };
    case GET_A_POKEMON:
      return { ...state, allPokemons: action.payload };
    default:
      return state;
  }
};
