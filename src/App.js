
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import AddMovies from './components/AddMovies';
import ManageWatchlist from './components/ManageWatchlist';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/addmovies' element={<AddMovies/>}></Route>
      <Route path='/managewatchlist' element={<ManageWatchlist/>}></Route>
      <Route path='/moviedetails/:id' element={<MovieDetails/>}></Route>



    
     
         </Routes>
    </div>
  );
}

export default App;
