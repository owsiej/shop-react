import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ShoppingListContext = createContext();

const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingListLoadingStatus, setShoppingListLoadingStatus] =
    useState("initial");
  const [
    addingProductToShoppingListStatus,
    setAddingProductToShoppingListStatus,
  ] = useState("initial");
  const [newProductSignal, setNewProductSignal] = useState(false);
  const [productDeletingStatus, setProductDeletingStatus] = useState("initial");

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

  const addProductToShoppingList = async (product) => {
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

  const deleteProductFromShoppingList = async (product) => {
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
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        shoppingListLoadingStatus,
        addProductToShoppingList,
        addingProductToShoppingListStatus,
        deleteProductFromShoppingList,
        productDeletingStatus,
        newProductSignal,
        setNewProductSignal,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
