import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

interface Product {
  id: string;
  productName: string;
  imgUrl: string;
  category: string;
  price: number;
  avgRating: number;
}

interface ProductListProps {
  data: Product[];
  useSwiper?: boolean;
}



const ProductList: React.FC<ProductListProps> = ({ data, useSwiper }) => {

  if (!data || data.length === 0) {
    return (
      <div className="no-products">
        <h1>No Products Found</h1>
      </div>
    );
  }
  if (useSwiper) {
    return (
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        breakpoints={{
          400: { slidesPerView: 1.5, spaceBetween: 16 },
          576: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          992: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <div className="ProList">
      {data.map((item) => (
        <div
          key={item.id}
        >
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
