import './App.css';
import {  Navigate, Route, Routes } from 'react-router';
import NewsPage from './components/pages/NewsPage';
import Favorites from './components/pages/Favorites';
import About from './components/pages/About';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Navigate to="/page/1" />}/>
      <Route path='/page/:pn' element ={<NewsPage/>} />
      <Route path='favorites' element={<Favorites />} />
      <Route path='about' element={<About />} />
      <Route path='*' element={<p>404 not found error</p>}/>
    </Routes>


  );
}

export default App;
