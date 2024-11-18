import Navbar from './components/Navbar.js';
import MainShop from './components/MainShop.js';
import Footer from './components/Footer.js';
import Account from './components/Account.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Product from './components/Product.js';
import ClothingNavbar from './components/ClothingNavbar.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ClothingNavbar />
      <Routes>
          <Route path="/" element={<MainShop />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Product" element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
