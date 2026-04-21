import "../styles/home.scss"
import heroImg from "../../src/assets/images/hero-img.png"
import { Link } from "react-router-dom"
import Services from "../services/Services";
import products from "../../src/assets/data/products"
import ProductList from "../components/UI/ProductList";
import DigitalClock from "../components/UI/Oclock";
import {Product} from "../types/Product"
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch=useDispatch();
  const year = new Date().getFullYear();
   const trendingProducts = products.filter(
    (item) => item.category === "mobile"
  );

  const bestSalesProducts = products.filter(
    (item) => item.category === "chair"
  );
   const theme=useSelector((state)=>state.theme.mode);

  return (
    <main className={`header-container ${
    theme === "dark" ? "dark" : "light"
  }`}>
      <section className="sectionOne">
        <div className="boxes">
          <div className="left-box">
            <h1>Welcome to E_CommerceSite</h1>
            <p>Your ultimate destination for movies ans series. Explore our vast collection and find your next favorite watch {year}</p>
            <Link to={"/shop"}>
            <button className="btn1">Show now </button>
            </Link>
          </div>
          <div className="right-box">
            <img src={heroImg} alt="" />
          </div>
        </div>
      </section>
      <Services></Services>

     <section className="trending_product">
        <h1>Trending Product</h1>
        <ProductList data={trendingProducts} useSwiper={true} />
      </section>

      <section className="Best">
        <h1 className="text-center">Best Sales Product</h1>
        <ProductList data={bestSalesProducts} useSwiper={true}/>
      </section>

    <section className="Oclock-section">
      <DigitalClock></DigitalClock>
    </section>
    </main>
  )
}

export default Home

