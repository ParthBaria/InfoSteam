import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import NewsPage from './components/pages/NewsPage';
import Favorites from './components/pages/Favorites';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Authenticate from './components/pages/Authenticate';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/page/1" />} />
      <Route path='/page/:pn' element={<NewsPage />} />
      <Route path='favorites' element={<Favorites />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Authenticate />} />
      < Route path='register' element={< Register />} />
      < Route path='*' element={<p  > 404 not found error</p >} />
    </Routes >


  );
}

export default App;
