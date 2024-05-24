import axios from "axios";
import { createContext, useState } from "react";

const ProductsContext = createContext();

const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState(productList);
  const [productLoadingStatus, setProductLoadingStatus] = useState("initial");

  const loadProductsFromApi = async () => {
    const url = "http://localhost:4000/api/productsList";

    try {
      setProductLoadingStatus("loading");
      const products = await axios.get(url);
      setProductLoadingStatus("loaded");
      setProductList(products.data);
      setProductCategories(
        Array.from(new Set(products.data.map((product) => product.category)))
      );
    } catch (error) {
      setProductLoadingStatus("error");
      console.log(error);
    }
  };

  const filterProductList = (e) => {
    const nameFilter = e.currentTarget.elements.text.value.toLowerCase();
    const categoryFilter = e.currentTarget.elements.categories.value;
    const isFoodProduct = e.currentTarget.elements.isFood.checked;

    setFilteredProductList(
      productList.filter((prod) => {
        const filterData = categoryFilter
          ? prod.category === categoryFilter &&
            prod.name.toLowerCase().includes(nameFilter)
          : prod.name.toLowerCase().includes(nameFilter);
        if (isFoodProduct) {
          return filterData && prod.isFood;
        }
        return filterData;
      })
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        productList,
        setProductList,
        loadProductsFromApi,
        productLoadingStatus,
        filteredProductList,
        filterProductList,
        productCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductProvider };
