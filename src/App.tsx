import React, { useEffect } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import {createSearchParams, Route, Routes, useSearchParams} from 'react-router-dom'
import { Header} from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useAppDispatch, useAppSelector } from './hooks/reducer';

import { CartPage } from './pages/CartPage';
import { Modal } from './components/modal/Modal';
import { Modal2 } from './components/modal/Modal2';
import { changeView, filterByPrice } from './store/productsSlice';
import { changePage } from './store/paginationSlice';
import { changeCategoriesArr, changeMaxAvailable, changeMaxPrice, changeMinAvailable, changeMinPrice, changeSorting } from './store/filterSlice';



function App() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams();

  const modalIsShown = useAppSelector((state) => state.modal.isHidden);
  const modalIsShown2 = useAppSelector((state) => state.modal2.isHidden2);

  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const sorting = useAppSelector((state) => state.filter.sorting);
  const minFiltered = useAppSelector((state) => state.filter.minPrice);
  const maxFiltered = useAppSelector((state) => state.filter.maxPrice);
  const minAv = useAppSelector((state) => state.filter.minAvailable);
  const maxAv = useAppSelector((state) => state.filter.maxAvailable);
  const view = useAppSelector((state) => state.products.view);
  const categoriesFiltered = useAppSelector((state) => state.filter.filterCategories.join('_'));


 
  useEffect(() => {
      const cats = searchParams.get('cats')?.split('_') || [];
      dispatch(changeMinPrice(Number(searchParams.get('min'))));
      dispatch(changeMaxPrice(Number(searchParams.get('max'))));
      cats.forEach((item) => dispatch(changeCategoriesArr(item)));
      dispatch(changeSorting(searchParams.get('sort') || 'default'));
      dispatch(changeMaxAvailable(Number(searchParams.get('maxav'))));
      dispatch(changeMinAvailable(Number(searchParams.get('minav'))));   
      dispatch(changePage(Number(searchParams.get('page'))));
      dispatch(changeView(searchParams.get('view') || ''));
  },[]);

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
      {modalIsShown2 && <Modal2 />}
    </>
  )
};

export default App;
