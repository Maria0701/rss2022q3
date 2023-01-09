import React, { useEffect} from "react"
import { BreadCrumbs } from "../components/breadcrumbs/BreadCrumbs";
import { H1Elt } from "../components/h1/H1";
import { Filters } from "../components/filters/Filters";
import { Sorting } from "../components/sorting/Sorting";
import { Catalog } from "../components/catalog/Catalog";
import { Pagination } from "../components/pagination/Pagination";
import { BREADCRUMBS_LINKS } from "../jsons/links";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchProductsThunkPerPage, paginateFiltered } from "../store/productsSlice";
import { changeGoodsPerPage, changePage} from "../store/paginationSlice";
import './catalog-page.css'
import { skip } from "../hooks/get-lowest-and-highest";
import { useSearchParams } from "react-router-dom";
import { ChangeState } from "../components/change-state/change-state";

const POSTS_PER_PAGE = 15;


export function CatalogPage() {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppSelector(state => state.products.products);
  const isFiltered = useAppSelector(state => state.filter.isFiltered);
  const errorProducts = useAppSelector(state => state.products.error);
  const loading = useAppSelector(state => state.products.loading);
  const totalItems = useAppSelector((state) => state.products.numOfProds);
  const currentPageStored = useAppSelector((state) => state.pagination.currentPage);
  const postsPerPageStored = useAppSelector((state) => state.pagination.goodsPerPage);
  const activeView = useAppSelector(state => state.products.view);

  const paginate = (pageNumber: number) => {
    dispatch(changePage(pageNumber));
    const toSkip = skip(pageNumber, postsPerPageStored);

    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', `${pageNumber}`);
    setSearchParams(updatedSearchParams.toString());
   
    if (!isFiltered){
      dispatch(fetchProductsThunkPerPage({limit: postsPerPageStored, skip: toSkip}));
    }

    if (isFiltered) {
      dispatch(paginateFiltered({limit: toSkip, skip: postsPerPageStored + toSkip}));

    }
  };

  useEffect(() => {
    dispatch(changeGoodsPerPage(POSTS_PER_PAGE));
    const toSkip = skip(currentPageStored, postsPerPageStored);
    if (!isFiltered) {
      dispatch(fetchProductsThunkPerPage({limit: postsPerPageStored, skip: toSkip}));
    }

    if (isFiltered) {
      dispatch(paginateFiltered({limit: toSkip, skip: postsPerPageStored + toSkip}));
    }
  }, [dispatch]);

 
  const getPageNumText = currentPageStored > 1 ? currentPageStored : '';
  
    return (
    <>
      { loading && <p>Application is loading</p> }
      { errorProducts && <p>Something went wrong</p>}
      <div className="container catalog__container">
        <BreadCrumbs links={BREADCRUMBS_LINKS}/>
      </div>
      <div className="container catalog__container">
        <H1Elt eltClass="catalog__h1" text={`Catalog ${getPageNumText}`} />
        <Filters eltClass="catalog__filters" />
        <div className="catalog__block">
          <div className="catalog__top">
            <Sorting/> <ChangeState eltClass="" active={activeView} />
          </div>
          <Catalog eltClass={`catalog__catalog ${activeView}`} products={products}/>
          <Pagination postsPerPage={postsPerPageStored} totalPosts={totalItems} paginate={paginate} currentPage={currentPageStored}/>
        </div>
      </div>
    </>
    );
};
