import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, setFilteredPokemons, setPokemon } from '../../redux/actions';
import './filters.scss';
import Select from './select/Select';
const typesOptions = ['Venenoso', 'Agua', 'Aire', 'Normal'];
const alphabeticalOptions = ['A-Z', 'Z-A'];
const attackOptions = ['Ascending', 'Descending'];
const pokemonsCreated = ['Existing', 'Created'];

function Filters() {
  const dispatch = useDispatch();
  const { allPokemons, allPokemonsBackUp } = useSelector((state) => state);
  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    const resp = await fetch('http://localhost:3001/types');
    const data = await resp.json();
    setTypes(data);
  };

  useEffect(() => {
    getTypes();
    // dispatch(getAllPokemons());
  }, []);

  const handleOnSelectedValue = (value, filterType) => {
    console.log('elegi: ', value, 'de', filterType);
    switch (filterType) {
      case 'attack':
        if (value === 'Ascending') {
          dispatch(setPokemon(orderAscending(true, filterType)));
          return;
        }
        if (value === 'Descending') {
          dispatch(setPokemon(orderAscending(false, filterType)));
          return;
        }
        break;
      case 'alphabetically':
        if (value === 'A-Z') {
          dispatch(setPokemon(orderAscending(true, 'name')));
        }
        if (value === 'Z-A') {
          dispatch(setPokemon(orderAscending(false, 'name')));
        }
      default:
        break;
    }
  };
  const orderAscending = (ascending, prop) => {
    if (ascending) {
      return allPokemons.sort((a, b) => {
        if (a[prop] == b[prop]) {
          return 0;
        }
        if (a[prop] < b[prop]) {
          return -1;
        }
        return 1;
      });
    } else {
      return allPokemons.sort((a, b) => {
        if (a[prop] == b[prop]) {
          return 0;
        }
        if (a[prop] < b[prop]) {
          return 1;
        }
        return -1;
      });
    }
  };

  const filterPokemons = (e) => {
    let filteredPokemons = [];
    for (let i = 0; i < allPokemonsBackUp.length; i++) {
      allPokemonsBackUp[i].type.map(
        (t) => t.id == e && filteredPokemons.push(allPokemonsBackUp[i])
      );
    }
    dispatch(setFilteredPokemons(filteredPokemons));
    return;
  };

  const filterByExistingOrNot = (e) => {
    let filteredPokemons = [];
    switch (e) {
      case 'Existing':
        filteredPokemons = allPokemonsBackUp.filter((pokemon) => typeof pokemon.id === 'number');
        break;
      case 'Created':
        filteredPokemons = allPokemonsBackUp.filter((pokemon) => typeof pokemon.id === 'string');
        break;
      default:
        break;
    }
    dispatch(setFilteredPokemons(filteredPokemons));
    return;
  };

  return (
    <div className='filters-container'>
      <div className='filters-list'>
        <Select title={'type'} order='0' allOptions={types} onSelectedValue={filterPokemons} />
        <Select
          title={'alphabetically'}
          order='1'
          allOptions={alphabeticalOptions}
          onSelectedValue={handleOnSelectedValue}
        />
        <Select
          title={'attack'}
          order='2'
          allOptions={attackOptions}
          onSelectedValue={handleOnSelectedValue}
        />
        <Select
          title={'created by'}
          order='3'
          allOptions={pokemonsCreated}
          onSelectedValue={(e) => {
            console.log(filterByExistingOrNot(e));
          }}
        />
      </div>
    </div>
  );
}
export default Filters;
