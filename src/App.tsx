import React from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import {Route, Routes} from 'react-router-dom'
import { Header} from './components/header/Header';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/product' element={<ProductPage />} />
        </Routes>
      </main>
    </>
  )
};

export default App;
