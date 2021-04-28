import Link from "next/link";
import Head from "next/head";
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

const defaultEndpoint = "http://localhost:3000/api/product";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);

  const data = await res.json();
  
  return {
    props: {
      data
    }
  }
}

export default function Home({data}) {
  
  const [products, setProducts] = useState<TProduct[]>(data);
  const [basket, setBasket] = useState<TProduct[]>([]);
  const [featured, setFeatured] = useState<TProduct>();
  
  const categories = [...new Set(products.map(product => product.category))];
  const prices = [...new Set(products.map(product => product.price))];

  const handleBasketClick = () => {
    console.log('baskete basuildi')
  }

  const addToCard = (product) => {
    setBasket([...basket, product]);
    console.log(product)
  }

  useEffect(() => {
    setFeatured(products.find(product => product.featured === true));
  }, [])

  // useEffect(() => {
  //   fetch(`/api/product`)
  //     .then((response) => response.json())
  //     // .then(data => console.log(data))
  //     .then((data) => setProducts(data));
  // }, []);

  return (
    <div className="container">
      <div className="header">
        <span>
          <img src="/logo.png" />
        </span>
        <span onClick={handleBasketClick}>
          <img src="basket.svg" />
          <span className="basket_counter">{basket.length}</span>
        </span>
      </div>

      <div className="basket_list">
        <img src="/cross.svg" />
        <div className="basket_list_product">
          <div>
            <p style={{fontStyle: "normal", fontWeight: "bold", fontSize: "20px", lineHeight: "22px"}}>Samurai King Resting</p>
            <p style={{fontStyle: "normal", fontWeight: "normal", fontSize: "29px", lineHeight: "32px"}}>$10000.00</p>
          </div>
          <img src="https://images.pexels.com/photos/7401966/pexels-photo-7401966.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=50"/>  
        </div>
        
        <hr />
        <button>CLEAR</button>
      </div>

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
            <p>Sort by: </p>
            <p style={{ color: "#9B9B9B" }}>Price</p>
          </div>
        </div>

        <div className="section">
          <div className="filters_wrapper">
            <p>Category</p>
            <div className="category_filters">
              <ul>
                {categories.map((category,index) => (
                  <li key={index}>
                    <input type="checkbox" />
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
                    <input type="checkbox" />
                    {price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="product_images">
            {products.map(product => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
