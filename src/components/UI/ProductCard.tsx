import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cardSlice';
import { toast } from 'react-toastify';
import { Product } from "../../types/Product";
import type { RootState, AppDispatch } from "../../app/store";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const theme = useSelector((state: RootState) => state.theme?.mode || "light");

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
    <div className={`product-item-cart ${theme}`}>
      {/* Şəkil konteyneri */}
      <div className="img-container">
        <Link to={`/shop/${item.id}`}>
          <img src={item.imgUrl} alt={item.productName} loading="lazy" />
        </Link>
        <div className="hover-actions">
          <button onClick={toggleWishlist} className="btn-action" aria-label="Wishlist">
            {isInWishlist ? '❤️' : '🤍'}
          </button>
          <button onClick={addToCart} className="btn-action" aria-label="Add to cart">
            +
          </button>
        </div>
      </div>

      {/* Məhsul haqqında məlumat */}
      <div className="product-info">
        <h1 title={item.productName}>{item.productName}</h1>
        <span className="price">${item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;