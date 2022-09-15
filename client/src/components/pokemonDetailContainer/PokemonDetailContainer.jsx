import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardDetail from "../cardDetail/CardDetail";

function PokemonDetailContainer() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  const getAPokemon = async (id) => {
    const resp = await fetch(`http://localhost:3001/pokemons/${id}`);
    const data = await resp.json();
    console.log(data);
    setPokemon(data);
  };

  useEffect(() => {
    getAPokemon(id);
  }, []);

  return (
    <>
      <CardDetail pokemon={pokemon} />
    </>
  );
}
export default PokemonDetailContainer;
