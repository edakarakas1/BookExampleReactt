import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from './pages/Books';
import Carts from './pages/Carts';
import BooksCreate from './pages/BooksCreate';
import BooksEdit from './pages/BooksEdit';
import Header from './companent/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/book' element={<Books />} />
          <Route path='/' element={<Books />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/book/create' element={<BooksCreate />} />
          <Route path='/book/edit/:id' element={<BooksEdit />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
