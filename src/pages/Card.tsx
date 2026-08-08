import React from "react";
import "../../src/styles/card.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cardSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { RootState } from "../app/store";

interface CartItem {
  id: number | string;
  productName: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

const Card: React.FC = () => {
  const dispatch=useDispatch();
const theme = useSelector((state: RootState) => state.theme.mode);
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const totalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  );
  const clearAll = () => {
    dispatch(cartActions.clearCart());
    toast.info("Bütün məhsullar silindi");
  };
  
  return (
    <section className={theme === "dark" ? "dark" : "light"}>
      <div className="cart-wrapper">
        <div className="cart-table">
          {cartItems.length === 0 ? (
            <h1>Sebet boşdur</h1>
          ) : (
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((pro: CartItem) => (
                  <Tr item={pro} key={pro.id} />
                ))}
              </tbody>
            </table>
            
          )}
          <button className="clear-all-btn" onClick={clearAll}>
                Hamısını Sil
              </button>
        </div>

        <div className="cart-summary">
          <h6>Umumi Qiymət</h6>
          <span>AZN {totalAmount}</span>
        </div>
      </div>
    </section>
  );
};




interface TrProps {
  item: CartItem;
}

const Tr: React.FC<TrProps> = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
    toast.error(`${item.productName} Mehsul silindi`);
  };
 
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
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.3 }}
          className="ri-delete-bin-line"
          onClick={deleteProduct}
        />
      </td>
      <td>
        <span onClick={addToCart }>+</span>
      </td>
    </tr>
  );
};

export default Card;
