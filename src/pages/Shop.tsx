import "../styles/shop.scss";
import ProductList from "../components/UI/ProductList";
import { useState } from "react";
import products from "../assets/data/products";
import type { Product } from "../types/Product";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const Shop = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [productsData, setProductsData] = useState<Product[]>(products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredValue = e.target.value;

    if (filteredValue === "") {
      setProductsData(products);
    } else {
      const filteredData = products.filter(
        (item) => item.category === filteredValue
      );
      setProductsData(filteredData);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    let sortedProducts = [...productsData];

    switch (sortValue) {
      case "a-z":
        sortedProducts.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;
      case "z-a":
        sortedProducts.sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
        break;
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = [...products];
    }

    setProductsData(sortedProducts);
  };

  const options = [
    { value: "mobile", label: "Mobile" },
    { value: "chair", label: "Chair" },
    { value: "watch", label: "Watch" },
    { value: "wireless", label: "Wireless" },
  ];

  const sortOptions = [
    { value: "", label: "Sort By" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
    { value: "low-high", label: "Ucuzdan Bahaya" },
    { value: "high-low", label: "Bahadan Ucuza" },
  ];

  return (
    <div className={`shopPage ${theme === "dark" ? "dark" : "light"
      }`}>
      <div className="searchBox">
        <select onChange={handleFilter}>
          <option value={""}>Filter By Category</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select onChange={handleSort}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input type="text" onChange={handleSearch} />
      </div>

      <div className="list">
        <ProductList data={productsData} />
      </div>
    </div>
  );
};

export default Shop;