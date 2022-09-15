import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import MainView from './components/mainView/MainView';
import PokemonListContainer from './components/pokemonListContainer/PokemonListContainer';
import CreateNewPokemon from './components/createNewPokemon/CreateNewPokemon';
import Footer from './components/footer/Footer';
import PokemonDetailContainer from './components/pokemonDetailContainer/PokemonDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <MainView />
          </Route>
          <Route exact path='/home'>
            <Header />
            <PokemonListContainer />
            <Footer />
          </Route>
          <Route exact path='/create-pokemon'>
            <CreateNewPokemon />
            <Footer />
          </Route>
          <Route exact path='/detail-pokemon/:id'>
            <PokemonDetailContainer />
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
