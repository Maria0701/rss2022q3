import React, { useEffect, useState } from "react"
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
import { fetchProducts } from "../store/productsActions";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { IMinMax } from "../models/models";
import { getHighestAndLowest } from "../hooks/get-lowest-and-highest";


export function CatalogPage() {

  const dispatch = useAppDispatch()
  const {error, loading, products} = useAppSelector(state => state.products);
  const [minmax, setMinMax] =useState<IMinMax>({
    min: 0,
    max: 0,
  });
  //let minmax: IMinMax;

  useEffect(() => {
    dispatch(fetchProducts());
    setMinMax(getHighestAndLowest(products))
  }, [dispatch]);

  useEffect(() => {
    if (products.length !== 0) {
      setMinMax(getHighestAndLowest(products))
    }
  },[products])
console.log(minmax, 'catalog');
    return (
    <>
      { loading && <p>Applcation is loading</p> }
      { error && <p>Something went wrong</p>}
      <div className="container catalog__container">
        <BreadCrumbs links={BREADCRUMBS_LINKS}/>
      </div>
      <div className="container catalog__container">
        <H1Elt eltClass="catalog__h1" />
        <Filters eltClass="catalog__filters" minmax={minmax} />
        <div className="catalog__block">
          <div className="catalog__top">
            <Tags/>
            <Sorting/>
          </div>
          <Catalog eltClass="catalog__catalog" products={products}/>
          <Pagination/>
        </div>
        <Container/>
      </div>
    </>
    );
};
