import React, { useState } from "react"
import { Container } from "../components/container/Container";
import { BreadCrumbs } from "../components/breadcrumbs/BreadCrumbs";
import { H1Elt } from "../components/h1/H1";
import { Filters } from "../components/filters/Filters";
import { Sorting } from "../components/sorting/Sorting";
import { Tags } from "../components/tags/Tags";
import { Catalog } from "../components/catalog/Catalog";
import { Pagination } from "../components/pagination/Pagination";
import { BREADCRUMBS_LINKS, CATEGORIES, PRODUCTS } from "../jsons/links";
import './catalog-page.css'


export function CatalogPage() {
    const [product ] = useState(PRODUCTS)
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage] = useState(8)

    const lastProductIndex = currentPage * productPerPage
    const firstProductIndex = lastProductIndex - productPerPage
    const currentProduct = product.slice(firstProductIndex, lastProductIndex)

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(product.length/productPerPage); i++) {
      pageNumbers.push(i)
    }

    function paginate (pageNumber: number): void{
      setCurrentPage(pageNumber)
    }
   

    return (
    <>
      <div className="container catalog__container">
        <BreadCrumbs links={BREADCRUMBS_LINKS}/>
      </div>
      <div className="container catalog__container">
        <H1Elt eltClass="catalog__h1" />
        <Filters eltClass="catalog__filters" categories={CATEGORIES} products={PRODUCTS} />
        <div className="catalog__block">
          <div className="catalog__top">
            <Tags/>
            <Sorting/>
          </div>
          <Catalog eltClass="catalog__catalog" products={currentProduct}/>
          <Pagination pageNum={pageNumbers} paginate={paginate}/>
        </div>
        <Container/>
      </div>
    </>
    );
};
