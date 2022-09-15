import { Link } from 'react-router-dom';
import './pokemonCard.scss';
import imgEggPokemon from '../../images/huevo-pokemon.png';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/detail-pokemon/${pokemon.id}`}>
      <div id='pokemonCard-container'>
        <div id='image-container'>
          {pokemon.image ? (
            <img src={pokemon?.image} alt='' />
          ) : (
            <img id='img-egg' src={imgEggPokemon} alt='' />
          )}
        </div>
        <div id='descriptionCard-container'>
          <p>
            name: <span>{pokemon?.name}</span>
          </p>
          <p>
            type:{' '}
            {pokemon?.type.map((type) => (
              <span key={type.id}>{type.name} </span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default PokemonCard;
