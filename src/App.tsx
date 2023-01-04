import React from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import {Route, Routes} from 'react-router-dom'
import { Header} from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useAppSelector } from './hooks/reducer';

import { CartPage } from './pages/CartPage';
import { Modal } from './components/modal/Modal';

function App() {
  const modalIsShown = useAppSelector((state) => state.modal.isHidden)

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
      {modalIsShown && <Modal />}
    </>
  )
};

export default App;
