import React from 'react'
import "../../styles/footer.scss"
import "./footer.scss"
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
  const dispatch=useDispatch();
   const theme=useSelector((state)=>state.theme.mode);
  return (
    <footer className={`footer ${
    theme === "dark" ? "dark" : "light"
  }`}>
      <div className="footer-container">
        <div className="footer-links">
          <span>Home</span>
          <span>Shop</span>
          <span>Card</span>
          <span>Contact</span>
          <span>Favorited</span>
        </div>
        <p className="footer-text">© 2024 Bütün hüquqlar qorunur</p>
      </div>
    </footer>
  )
}

export default Footer
