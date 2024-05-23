import { useContext } from "react";
import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";

const ProductsFilters = () => {
  const { filterProductList } = useContext(ProductsContext);

  return (
    <div className="Wrapper">
      <label htmlFor="productFilter">Filter product name</label>
      <input
        id="productFilter"
        type="text"
        onChange={(event) => filterProductList(event.target.value)}
      />
    </div>
  );
};

export default ProductsFilters;
