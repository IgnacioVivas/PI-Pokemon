import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import Loader from '../loader/Loader';
import Pagination from '../pagination/Pagination';
import PokemonList from '../pokemonList/PokemonList';

function PokemonListContainer() {
  const dispatch = useDispatch();
  const { allPokemons } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    dispatch(getAllPokemons());
    console.log(allPokemons);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {allPokemons.length === 0 && <Loader />}
      {allPokemons.length > 0 && (
        <>
          <PokemonList pokemons={currentPokemons} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allPokemons.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}
export default PokemonListContainer;
