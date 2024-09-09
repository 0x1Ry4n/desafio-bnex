import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/navbar.component';
import Login from './components/users/login.component';
import Register from './components/users/register.component';
import Profile from './components/users/profile.component';
import Home from './components/home.component';
import Products from './components/products/products.component'; 
import ProtectedRoute from './ProtectedRoute'; 

function App() {
  return (
    <>
      <NavBar />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/products' element={<ProtectedRoute element={<Products />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
