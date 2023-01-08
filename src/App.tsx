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



function App() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

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
    console.log(searchParams.get('cats')?.split('_'));
    dispatch(filterByPrice({
        min: Number(searchParams.get('min')), 
        max: Number(searchParams.get('max')),
        minAv: Number(searchParams.get('minav')),
        maxAv: Number(searchParams.get('maxav')),
        cats: searchParams.get('cats')?.split('_') || [], 
        direction: searchParams.get('sort') || 'default',
    }));
    
    dispatch(changePage(Number(searchParams.get('page'))));
    dispatch(changeView(searchParams.get('view') || ''));

  },[]);

  useEffect(() => {
    setSearchParams(
      createSearchParams({ 
        page: `${currentPage}`, 
        sort: sorting, 
        min: `${minFiltered}`, 
        max: `${maxFiltered}`,
        minav: `${minAv}`,
        maxav: `${maxAv}`,
        cats: categoriesFiltered,
        view: view,
      })
    );
  }, [currentPage, sorting, minFiltered, maxFiltered, categoriesFiltered, view]);

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
