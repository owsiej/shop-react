import { useContext } from "react";
import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";

const ProductsFilters = () => {
  const { filterProductList, productCategories } = useContext(ProductsContext);

  return (
    <form className="Wrapper" onChange={filterProductList}>
      <label htmlFor="productFilter">Filter product name</label>
      <input id="productFilter" type="text" name="text" />
      <label htmlFor="categories">Filter by category</label>
      <select name="categories" id="categories">
        <option></option>
        {productCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="isFood">is Food</label>
      <input type="checkbox" name="isFood" id="isFood" />
    </form>
  );
};

export default ProductsFilters;
