import "./DashboardContent.css";
import ProductsFilters from "../zaliczenie/ProductsFilters/ProductsFilters";
import ProductsList from "../zaliczenie/ProductsList/ProductsList";
import ShopingList from "../zaliczenie/ShopingList/ShopingList";
import { ProductProvider } from "../../context/productsContext";
import { ShoppingListProvider } from "../../context/shoppingListContext";
function DashboardContent() {
  return (
    <>
      <ProductProvider>
        <ShoppingListProvider>
          <div className="appWrapper">
            <ProductsFilters />
            <div className="columnsWrapper">
              <ProductsList />
              <ShopingList />
            </div>
          </div>
        </ShoppingListProvider>
      </ProductProvider>
    </>
  );
}

export default DashboardContent;
