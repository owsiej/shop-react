import { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";
import { ShoppingListContext } from "../../../context/shoppingListContext";

const ProductsList = () => {
  const {
    productList,
    loadProductsFromApi,
    productLoadingStatus,
    filteredProductList,
  } = useContext(ProductsContext);

  const { addProductToShoppingList, addingProductToShoppingListStatus } =
    useContext(ShoppingListContext);

  const [productListToDisplay, setProductListToDisplay] = useState(productList);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    setProductListToDisplay(productList);
  }, [productList]);

  useEffect(() => {
    setProductListToDisplay(filteredProductList);
  }, [filteredProductList]);

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
                  onClick={() => {
                    setSelectedProduct(product.name);
                    addProductToShoppingList(product);
                  }}
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
