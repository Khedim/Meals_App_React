import logo from './logo.svg';
import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import { useGlobalContext } from './context';

function App() {
  const {showModel, favoriteMeals} = useGlobalContext()
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        {!!favoriteMeals.length && <Favorites />}
        <Meals />
        {showModel && <Modal />}
      </header>
    </div>
  );
}

export default App;
