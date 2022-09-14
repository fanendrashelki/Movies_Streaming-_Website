import './App.css';
import Navbar from './components/Navbar'

import Movies from './components/Movies';
import Favourite from './components/Favourite';
import { Route, Routes } from 'react-router-dom';
import SingleMovies from './components/SingleMovies';
import Footer from './Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<SingleMovies />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
