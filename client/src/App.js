import Home from './components/Home';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './components/BookDetails';
import SearchResults from './components/SearchResults';
import Filter from './components/Filter';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import AdminBookDetails from './components/AdminBookDetails';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/books/:id' element={<BookDetails/>}/>
          <Route path='/admin/books/:id' element={<AdminBookDetails/>}/>
          <Route path='/search' element={<SearchResults/>}/>
          <Route path='/filter' element={<Filter/>}/>
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin/home" element={<AdminHome/>}/>
         </Routes>
    </BrowserRouter>
  );
}

export default App;
