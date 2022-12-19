import React from "react"
import { Container } from "../components/container/Container";
import { BreadCrumbs } from "../components/breadcrumbs/BreadCrumbs";
import { H1 } from "../components/h1/H1";
import { Filters } from "../components/filters/Filters";
import { Sorting } from "../components/sorting/Sorting";
import { Tags } from "../components/tags/Tags";
import { Catalog } from "../components/catalog/Catalog";
import { Pagination } from "../components/pagination/Pagination";


export function CatalogPage() {
    return (
    <div className="container">
      <Container/>
      <BreadCrumbs/>
      <H1/>
      <Filters/>
      <Sorting/>
      <Tags/>
      <Catalog/>
      <Pagination/>
    </div>
    );
};
