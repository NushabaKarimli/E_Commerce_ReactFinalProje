import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cardSlice';
import { toast } from 'react-toastify';
import { Product } from "../../types/Product";
import type { RootState } from "../../app/store";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice"

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  
  // Check if product is in wishlist by ID
  const isInWishlist = wishlistItems.some(wishItem => wishItem.id === item.id);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
        quantity: 1,
        totalPrice: item.price
      })
    );
    toast.success(`${item.productName} səbətə əlavə olundu`);
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
      toast.info(`${item.productName} sevimlilərdən silindi`);
    } else {
      dispatch(addToWishlist(item));
      toast.success(`${item.productName} sevimlilərə əlavə olundu`);
    }
  };


  return (
    <div className='product-item-cart'>
      <Link to={`/shop/${item.id}`}>
        <img width={150} src={item.imgUrl} alt="" />
      </Link>
      <h1>{item.productName}</h1>
      <button onClick={addToCart} className='btn btn-successc'>+</button>
      <button onClick={toggleWishlist} className='btn btn-wishlist'>
        {isInWishlist ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default ProductCard;
