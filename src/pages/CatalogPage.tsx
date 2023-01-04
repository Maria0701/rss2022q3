import React, { useEffect} from "react"
import { Container } from "../components/container/Container";
import { BreadCrumbs } from "../components/breadcrumbs/BreadCrumbs";
import { H1Elt } from "../components/h1/H1";
import { Filters } from "../components/filters/Filters";
import { Sorting } from "../components/sorting/Sorting";
import { Tags } from "../components/tags/Tags";
import { Catalog } from "../components/catalog/Catalog";
import { Pagination } from "../components/pagination/Pagination";
import { BREADCRUMBS_LINKS } from "../jsons/links";
import './catalog-page.css'
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchProductsThunk } from "../store/productsSlice";


export function CatalogPage() {

  const dispatch = useAppDispatch()
  
  const products = useAppSelector(state => state.products.products);
  const errorProducts = useAppSelector(state => state.products.error);
  const loading = useAppSelector(state => state.products.loading);
  const filtersApplied = useAppSelector(state => state.filter);
  

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);
  
    return (
    <>
      { loading && <p>Application is loading</p> }
      { errorProducts && <p>Something went wrong</p>}
      <div className="container catalog__container">
        <BreadCrumbs links={BREADCRUMBS_LINKS}/>
      </div>
      <div className="container catalog__container">
        <H1Elt eltClass="catalog__h1" />
        <Filters eltClass="catalog__filters" />
        <div className="catalog__block">
          <div className="catalog__top">
            <Sorting/>
          </div>
          <Catalog eltClass="catalog__catalog" products={products}/>
          <Pagination />
        </div>
      </div>
    </>
    );
};
