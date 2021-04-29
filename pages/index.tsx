import { useEffect, useState } from "react";
import Product from '../components/Product';

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

const getResponse = async (page = 1, category = [], sort = "", asc = 1) => {
    
  const params = { page, category, sort, asc };
  
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
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedAsc, setSelectedAsc] = useState(1);

  const prices = [...new Set(response.docs.map(product => product.price))];

  const toggleBasket = () => {
    setIsBasketVisible(!isBasketVisible);
  }

  const addToCard = (product) => {
    setBasket([...basket, product]);
    setIsBasketVisible(true);
    console.log(product);
  }

  const handleClearBasket = () => {
    setBasket([]);
    setIsBasketVisible(false);
  }

  const handleGetData = async (index) => {
    const data = await getResponse(index, selectedCategories, selectedSort, selectedAsc);
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

  const handlePriceFilter = (filter) => {
    console.log(filter);
  }

  const handleSortSelect = (value) => {
    setSelectedSort(value.target.value);
  }

  const handleSortAscSelect = (asc) => {
    
    setSelectedAsc(asc);
  }

  useEffect(() => {
    handleGetData(1);
  }, [selectedCategories, selectedSort, selectedAsc])

  return (
    <div className="container">
      <div className="header">
        <span>
          <img src="/logo.png" />
        </span>
        <span onClick={toggleBasket}>
          <img src="basket.svg" />
          <span className="basket_counter">{basket.length}</span>
        </span>
      </div>

      { isBasketVisible && (
        <div className="basket_list">
          <span onClick={toggleBasket} style={{fontSize: 40}}>&#10005;</span>
            {basket.map(item => (
              <div className="basket_list_product">  
                <div>
                  <p style={{fontStyle: "normal", fontWeight: "bold", fontSize: "20px", lineHeight: "22px"}}>{item.name}</p>
                  <p style={{fontStyle: "normal", fontWeight: "normal", fontSize: "29px", lineHeight: "32px"}}>${item.price}</p>
                </div>
                <img src={item.image}/>
              </div>
            ))}
          <hr />
          <button onClick={handleClearBasket}>CLEAR</button>
        </div>
      )}
      

      <hr />

      <div className="banner_header">
        <div className="title">{featured?.name}</div>
        <div style={{ marginTop: 58 }}>
          <button onClick={() => addToCard(featured)} className="add_card_button">Add to card</button>
        </div>
      </div>

      <div className="banner_wrapper">
        
        <div>
          <img
            className="banner_image"
            src={featured?.image}
          />
        </div>

        <div className="small">Photo of the day</div>
      </div>

      <div>
        <div className="banner_details">
          <div className="left">
            <p className="left_title">About {featured?.name}</p>
            <p
              style={{ color: "#656565", fontSize: "22px", lineHeight: "24px" }}
            >
              Pets
            </p>
            <div className="left_details">
              <p>
                So how did the classical Latin become so incoherent? According
                to McClintock, a 15th century typesetter likely scrambled part
                of Cicero's De Finibus in order to provide placeholder text to
                mockup various fonts for a type specimen book.So how did the
                classical Latin become so incoherent? According to McClintock, a
                15th century typesetter likely scrambled part of Cicero's De
                Finibus in order to provide placeholder
              </p>
              <p>
                text to mockup various fonts for a type specimen book.So how did
                the classical Latin become so incoherent? According to
                McClintock.
              </p>
            </div>
          </div>

          <div className="right">
            <p className="left_title">People also buy</p>
            <div className="small_images">
              <img src="https://images.pexels.com/photos/2633986/pexels-photo-2633986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
              <img src="https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
              <img src="https://images.pexels.com/photos/279480/pexels-photo-279480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </div>

            <div className="right_details">
              <span className="right_details_title">Details</span>
              <p>Size: 1020 x 1020 pixel</p>
              <p>Size: 15 mb</p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="products_wrapper">
        <div className="products_title">
          <div style={{ display: "flex", fontSize: 30, lineHeight: "33px" }}>
            <p style={{ fontWeight: "bold" }}>Photography</p>
            <p style={{ color: "#9B9B9B" }}> / Premium Photos</p>
          </div>

          <div style={{ display: "flex", fontSize: 22, lineHeight: "24px" }}>
            <img onClick={() => handleSortAscSelect(1)} src="/sortdown.svg" />
            <img onClick={() => handleSortAscSelect(-1)} src="/sortup.svg" />
            <p style={{ color: "#9B9B9B" }}>Sort by</p>
            <select onChange={handleSortSelect}>
              <option value="">Select Option</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
            <img src="/sortselect.svg" />
          </div>
        </div>

        <div className="section">
          <div className="filters_wrapper">
            <p>Category</p>
            <div className="category_filters">
              <ul>
                {categories.map((category,index) => (
                  <li key={index}>
                    <input onClick={() => handleCategoryFilter(category)} value={category} type="checkbox" />
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <p>Price range</p>
            <div className="price_filters">
              <ul>
                {prices.map((price, index) => (
                  <li key={index}>
                    <input onClick={() => handlePriceFilter(price)} type="checkbox" />
                    {price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="product_images">
            {/* {products.map(product => (
              !product.featured && 
              (<Product product={product} addCard={addToCard} key={product._id} />)
            ))} */}
              {response.docs.map(product => (
          
              <Product product={product} addCard={addToCard} key={product._id} />)
            )}
          </div>


        </div>
      </div>
      
      
      <div>
        <h1>{response.totalPages}</h1>
        {new Array(response.totalPages).fill("").map((page, index) => (
          <button 
            key={index} 
            className={index+1 === response?.page ? "isActivePage" : ""} 
            onClick={() => handleGetData(index+1)}>{index + 1 }</button>
        ))}
      </div>
    
    </div>
  );
}
