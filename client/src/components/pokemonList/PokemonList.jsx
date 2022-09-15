import PokemonCard from "../pokemonCard/PokemonCard";
import "./pokemonList.scss";

function PokemonList({ pokemons }) {
  return (
    <div id="pokemons-container">
      <div id="pokemons-list">
        {pokemons?.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
}
export default PokemonList;
