import React, { useEffect } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import {Route, Routes} from 'react-router-dom'
import { Header} from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useAppDispatch } from './hooks/reducer';
import { fetchCategories } from './store/categoriesActions';

function App() {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(fetchCategories())
  }, [dispatch]);

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
};

export default App;
