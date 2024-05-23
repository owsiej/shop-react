import { createContext, useState } from "react";

const ShoppingListContext = createContext();

const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [newProductSignal, setNewProductSignal] = useState(false);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        newProductSignal,
        setNewProductSignal,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
