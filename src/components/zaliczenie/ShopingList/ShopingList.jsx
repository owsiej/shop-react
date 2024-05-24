import { useContext, useState } from "react";
import "../commonStyles.css";
import { ShoppingListContext } from "../../../context/shoppingListContext";
import { LinearProgress } from "@mui/material";

const ShopingList = () => {
  const {
    shoppingList,
    deleteProductFromShoppingList,
    productDeletingStatus,
    shoppingListLoadingStatus,
  } = useContext(ShoppingListContext);

  const [selectedProduct, setSelectedProduct] = useState("");

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
                  onClick={() => {
                    setSelectedProduct(product.name);
                    deleteProductFromShoppingList(product);
                  }}
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
