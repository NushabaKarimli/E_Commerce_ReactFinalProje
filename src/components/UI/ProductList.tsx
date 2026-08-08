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
      <div className="row">
        <div className="col-4">
          <h1>No Products Found</h1>
        </div>
      </div>
    );
  }
  if (useSwiper) {
    return (
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
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
