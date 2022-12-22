import React from "react"
import { Container } from "../components/container/Container";
import { BreadCrumbs } from "../components/breadcrumbs/BreadCrumbs";
import { H1Elt } from "../components/h1/H1";
import { Filters } from "../components/filters/Filters";
import { Sorting } from "../components/sorting/Sorting";
import { Tags } from "../components/tags/Tags";
import { Catalog } from "../components/catalog/Catalog";
import { Pagination } from "../components/pagination/Pagination";
import { BREADCRUMBS_LINKS, CATEGORIES } from "../jsons/links";
import './catalog-page.css'


export function CatalogPage() {
    return (
    <>
      <div className="container catalog__container">
        <BreadCrumbs links={BREADCRUMBS_LINKS}/>
      </div>
      <div className="container catalog__container">
        <H1Elt eltClass="catalog__h1" />
        <Filters eltClass="catalog__filters" categories={CATEGORIES} />
        <div className="catalog__block">
          <div className="catalog__top">
            <Tags/>
            <Sorting/>
          </div>
          <Catalog eltClass="catalog__catalog" />
          <Pagination/>
        </div>
        <Container/>
      </div>
    </>
    );
};
