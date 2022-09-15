import "./cardDetail.scss";
import heart from "../../images/heart-line.svg";
import { Link, useLocation } from "react-router-dom";
import imgGoBack from "../../images/arrow-go-back-line.svg";
import imgEggPokemon from '../../images/huevo-pokemon.png'

function CardDetail({ pokemon }) {
  console.log(pokemon);

  const currentPath = useLocation();
  console.log(currentPath.pathname.includes("/detail-pokemon/") );
  return (
    <div id="detail-container">
      <div id="width-container">
        {
          currentPath.pathname.includes("/detail-pokemon/") && 
          <div id="arrow-go-back">
            <Link to={`/home`}>
              <img src={imgGoBack} alt="" />
            </Link>
          </div>
        }
        <div id="card-detail">
          <div id="info-top">
            <p>{pokemon.name}</p>
            <div id="health-container">
              <img src={heart} alt="" />
              <p>{pokemon.health}</p>
            </div>
          </div>
          <div id="img-section">
            <div id="img-container">
              {pokemon.image ? (
                <img src={pokemon?.image} alt="" />
              ) : (
                <img
                  src={imgEggPokemon}
                  alt=""
                />
              )}
            </div>
          </div>
          <div id="info-bottom">
            <div id="center-container">
              {currentPath.pathname.includes("/detail-pokemon/") &&
              <p>
                type:{" "}
                {pokemon &&
                  pokemon?.type?.map((type) => (
                    <span key={type.id}>{type.name} </span>
                  ))}
              </p> 
              }
              <p>speed: {pokemon.speed}</p>
              <p>attack: {pokemon.attack}</p>
              <p>defence: {pokemon.defence}</p>
              <p>height: {pokemon.height}</p>
              <p>weight: {pokemon.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDetail;
