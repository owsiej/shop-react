import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";

import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";
import { ShoppingListContext } from "../../../context/shoppingListContext";

const ProductsList = () => {
  const { productList, setProductList } = useContext(ProductsContext);
  const { filteredProductList } = useContext(ProductsContext);
  const { newProductSignal, setNewProductSignal } =
    useContext(ShoppingListContext);
  const [productLoadingStatus, setProductLoadingStatus] = useState("initial");
  const [
    addingProductToShoppingListStatus,
    setAddingProductToShoppingListStatus,
  ] = useState("initial");
  const [productListToDisplay, setProductListToDisplay] = useState(productList);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    setProductListToDisplay(productList);
  }, [productList]);

  useEffect(() => {
    setProductListToDisplay(filteredProductList);
  }, [filteredProductList]);

  const loadProductsFromApi = async () => {
    const url = "http://localhost:4000/api/productsList";

    try {
      setProductLoadingStatus("loading");
      const products = await axios.get(url);
      setProductLoadingStatus("loaded");
      setProductList(products.data);
    } catch (error) {
      setProductLoadingStatus("error");
      console.log(error);
    }
  };

  const addProductToShoppingList = async (product) => {
    setSelectedProduct(product.name);
    const url = "http://localhost:4000/api/shoppingList";
    try {
      setAddingProductToShoppingListStatus("adding");
      await axios.post(url, product);
      setAddingProductToShoppingListStatus("added");
      setNewProductSignal(!newProductSignal);
    } catch (error) {
      setAddingProductToShoppingListStatus("error");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <button onClick={loadProductsFromApi}>Załaduj listę produktów</button>
        {productLoadingStatus === "loading" ? (
          <>
            <p>Loading product list...</p>
            <p>
              <LinearProgress style={{ minWidth: 200 }} />
            </p>
          </>
        ) : (
          <>
            <p>Products list</p>
            <ul
              className={
                addingProductToShoppingListStatus === "adding" ? "disabled" : ""
              }
            >
              {productListToDisplay.map((product) => (
                <li
                  key={product.id}
                  onClick={() => addProductToShoppingList(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
            {addingProductToShoppingListStatus === "adding" ? (
              <>
                <p>Adding {selectedProduct} to shopping list</p>
                <p>
                  <LinearProgress style={{ minWidth: 200 }} />
                </p>
              </>
            ) : null}
          </>
        )}
      </header>
    </div>
  );
};

export default ProductsList;
