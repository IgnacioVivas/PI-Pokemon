import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPokemon } from '../../../redux/actions';
import './search.scss';
import imgSearch from '../../../images/search-line.svg';
import imgClose from '../../../images/close-line.svg';

function Search() {
  const [search, setSearch] = useState('');
  const [changeImg, setChangeImg] = useState(true);
  const { allPokemons } = useSelector((state) => state);
  const dispatch = useDispatch();

  const a = () => {
    const z = allPokemons.filter((pokemon) => pokemon.name === search);
    console.log(z);
    if (z.length === 0) {
      console.log('no se encontro el pokemon');
    }
  };

  const handleOnChangeInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') resetSearch();
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) doSearch();
  };

  const doSearch = () => {
    dispatch(getAPokemon(search));
    setChangeImg(false);
    a();
  };

  const resetSearch = () => {
    setSearch('');
    dispatch(getAPokemon(''));
    setChangeImg(true);
  };

  useEffect(() => {
    setChangeImg(true);
  }, [search]);

  return (
    <div id='input-wrapper'>
      <input
        id='input'
        type='text'
        value={search}
        onChange={handleOnChangeInput}
        onKeyDown={handleOnKeyDown}
      />
      {changeImg ? (
        <img src={imgSearch} alt='' id='img-search' onClick={doSearch} />
      ) : (
        <img src={imgClose} alt='' id='img-search' onClick={resetSearch} />
      )}
    </div>
  );
}
export default Search;
