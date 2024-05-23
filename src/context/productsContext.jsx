import { createContext, useState } from "react";

const ProductsContext = createContext();

const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState(productList);

  const filterProductList = (value) => {
    setFilteredProductList(
      productList.filter((product) =>
        product.name.includes(value.toLowerCase())
      )
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        productList,
        setProductList,
        filteredProductList,
        filterProductList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductProvider };
