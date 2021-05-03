import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Product from '../components/Product';
import Basket from '../components/Basket';
import Banner from '../components/Banner';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import ProductSectionTitle from '../components/ProductSectionTitle';

interface TProduct {
  _id: string
  name: string
  category: string
  price: number
  currency: string
  image: string
  bestseller: boolean
  featured: boolean
  details: string | null
}

const baseURL = "http://localhost:3000";

const getResponse = async (page = 1, category = [], price="", sort = "", asc = 1) => {
    
  const params = { page, category, price, sort, asc };
  var url: any = new URL(`${baseURL}/api/product`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getServerSideProps() {
  
  const data = await getResponse();
  
  const categories = await (await fetch(`${baseURL}/api/category`)).json();
    
  const featured = await (await fetch(`${baseURL}/api/featured`)).json();

  return {
    props: {
      data,
      categories,
      featured
    }
  }
}

export default function Home({data, categories, featured}) {
  
  const [basket, setBasket] = useState<TProduct[]>([]);
  
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [response, setResponse] = useState<any>(data);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedAsc, setSelectedAsc] = useState(1);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFilter = () => {
    setIsFiltersVisible(!isFiltersVisible);
  }

  const prices = {
    "0-20": "Lower than $20",
    "20-100": "$20 - $100",
    "100-200": "$100 - $200",
    "200": "More than $200"
  };

  const toggleBasket = () => {
    setIsBasketVisible(!isBasketVisible);
  }

  const addToCard = (product) => {
    setBasket([...basket, product]);
    setIsBasketVisible(true);
  }

  const handleClearBasket = () => {
    setBasket([]);
    setIsBasketVisible(false);
  }

  const handleGetData = async (index) => {
    const data = await getResponse(index, selectedCategories, selectedPrice, selectedSort, selectedAsc);
    setResponse(data);
  }

  const handleCategoryFilter = (filter) => {
    const index = selectedCategories.findIndex((value) => value === filter);
    
    if( index !== -1 ) {
      selectedCategories.splice(index, 1);
      return setSelectedCategories([...selectedCategories]);
    }
    return setSelectedCategories([...selectedCategories, filter]);
  }

  const handlePriceFilter = (price) => {
    price.target.checked ? setSelectedPrice(price.target.value) : setSelectedPrice('');
  }

  const handleSortSelect = (value) => {
    setSelectedSort(value.target.value);
  }

  const handleSortAscSelect = (asc) => {
    setSelectedAsc(asc);
  }

  useEffect(() => {
    handleGetData(1);
  }, [selectedCategories, selectedPrice, selectedSort, selectedAsc])

  return (
    <div className="container">
      <Header toggleBasket={toggleBasket} basket={basket}/>

      { isBasketVisible && (
        <Basket 
          basket={basket} 
          toggleBasket={toggleBasket} 
          handleClearBasket={handleClearBasket}
        />
      )}
      
      <hr />
      <Banner featured={featured} addToCard={addToCard}/>
      <hr />

      <div>
        <ProductSectionTitle 
          handleSortAscSelect={handleSortAscSelect} 
          handleSortSelect={handleSortSelect}
          toggleFilter={toggleFilter}
        />

        <div className="products_wrapper">
          <Filter
            visible={`${isFiltersVisible ? "visible" : ""}`}
            toggleFilter={toggleFilter}
            categories={categories}
            prices={prices}
            handleCategoryFilter={handleCategoryFilter}
            handlePriceFilter={handlePriceFilter}
            selectedPrice={selectedPrice}
          />

          <div className="product_images">
            {response.docs.map(product => (
              <Product product={product} addCard={addToCard} key={product._id} />)
            )}
          </div>
        </div>
      </div>
      
      <Pagination response={response} handleGetData={handleGetData}/>
     
    </div>
  );
}
