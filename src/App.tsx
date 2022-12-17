import React from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='/product' element={<ProductPage />} />
      </Routes>
    </>
  )
};

export default App;
