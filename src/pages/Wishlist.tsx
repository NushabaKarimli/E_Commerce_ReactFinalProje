import React from 'react'
import "./wish.scss"
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Wishlist: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  return (
    <div className={`wishlist-page ${theme === "dark" ? "dark" : "light"}`}>
      <h2>Wishlist ({wishlistItems.length})</h2>

      {wishlistItems.length === 0 ? (
        <p>Sizin sevimlilər siyahınız boşdur.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(product => (
            <div key={product.id} className="wishlist-item">
              <img src={product.imgUrl} alt={product.productName} loading="lazy" />
              <h3>{product.productName}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
