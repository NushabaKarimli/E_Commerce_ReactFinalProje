import "../styles/productDetail.scss"
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from '../redux/slices/cardSlice';
import { toast } from 'react-toastify';
import { RootState } from "../app/store";
import { Star } from "lucide-react";
const ProductDetail: React.FC = () => {

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);


  const addToCart = () => {
    if (!product) return;
    dispatch(
      cartActions.addItem({
        id: product.id,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
        quantity: 1,
        totalPrice: product.price
      })
    );
    toast.success(`${product.productName} səbətə əlavə olundu`);
  };
  if (!product) {
    return <h2>Product not found</h2>;
  }



  return (
    <div className={`product-detail ${theme === "dark" ? "dark" : "light"
      }`}>
      <div className="product-image">
        <img src={product.imgUrl} alt={product.productName} />
      </div>

      <div className="product-info">
        <h1>{product.productName}</h1>
        <p className="price">${product.price}</p>
        <p className="category">Kateqoriya: {product.category}</p>
        <p className="rating">Reytinq: {product.avgRating} <Star /></p>

        <div className="description">
          <h3>Təsvir</h3>
          <p>{product.description}</p>
        </div>

        <div className="reviews">
          <h3>Rəylər</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className="review">
              <p><Star />{review.rating}</p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>

        <button className="add-to-cart" onClick={addToCart}>Səbətə əlavə et</button>
      </div>
    </div>

  )
}

export default ProductDetail
