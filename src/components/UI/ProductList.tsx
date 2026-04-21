// import React from 'react';
// import ProductCard from './ProductCard';
// import products from '../../assets/data/products';
// import { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
// const ProductList = (props) => {
//   return (
//     <div className="product-list">
//       {products
//         .filter(item => item.category === props.category)
//         .map(item => (
//             <ProductCard
//               key={item.id}  // key əlavə edin
//               id={item.id}  
//               productName={item.productName}
//               imgUrl={item.imgUrl}
//               category={item.category}
//               price={item.price}
//               avgRating={item.avgRating}
//             />
//         ))
//       }
//     </div>
//   );
// };

// export default ProductList;



import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";

/* ===== TYPES ===== */
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


const ProductList: React.FC<ProductListProps> = ({data, useSwiper}) => {

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
