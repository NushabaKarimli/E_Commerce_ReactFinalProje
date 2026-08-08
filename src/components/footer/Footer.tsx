import "./footer.scss"
import { useSelector } from 'react-redux';
import type { RootState } from "../../app/store";
const Footer = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <footer className={`footer ${theme === "dark" ? "dark" : "light"
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
