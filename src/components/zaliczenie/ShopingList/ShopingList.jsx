import { useContext, useEffect, useState } from "react";
import "../commonStyles.css";
import { ShoppingListContext } from "../../../context/shoppingListContext";
import { LinearProgress } from "@mui/material";
import axios from "axios";

const ShopingList = () => {
  const { shoppingList, setShoppingList, newProductSignal } =
    useContext(ShoppingListContext);
  const [shoppingListLoadingStatus, setShoppingListLoadingStatus] =
    useState("initial");
  const [productDeletingStatus, setProductDeletingStatus] = useState("initial");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setShoppingListLoadingStatus("loading");
        const shoppingListFromApi = await axios.get(
          "http://localhost:4000/api/shoppingList"
        );
        setShoppingListLoadingStatus("loaded");
        setShoppingList(shoppingListFromApi.data);
      } catch (error) {
        setShoppingListLoadingStatus("error");
        console.log(error);
      }
    }
    fetchData();
  }, [newProductSignal]);

  const deleteProductFromShoppingList = async (product) => {
    setSelectedProduct(product.name);
    const url = `http://localhost:4000/api/shoppingList/${product.id}`;
    try {
      setProductDeletingStatus("deleting");
      await axios.delete(url);
      setProductDeletingStatus("deleted");
      setShoppingList(shoppingList.filter((prod) => prod.id !== product.id));
    } catch (error) {
      setProductDeletingStatus("error");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="AppHeader">
        {shoppingListLoadingStatus === "loading" ? (
          <>
            <p>Loading shopping list...</p>
            <p>
              <LinearProgress style={{ minWidth: 200 }} />
            </p>
          </>
        ) : (
          <>
            <p>Shopping list</p>
            <ul
              className={productDeletingStatus === "deleting" ? "disabled" : ""}
            >
              {shoppingList.map((product) => (
                <li
                  key={product.id}
                  onClick={() => deleteProductFromShoppingList(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
            {productDeletingStatus == "deleting" ? (
              <>
                <p>Deleting {selectedProduct} from shopping list</p>
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
export default ShopingList;
