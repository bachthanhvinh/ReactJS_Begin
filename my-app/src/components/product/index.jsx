import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";

const Product = () => {
  const [reloadProduct, setReloadProduct] = useState(false);

  const renderProduct = () => {
    return setReloadProduct(!reloadProduct);
  };
  return (
    <>
      <h2>Danh sách sản phẩm</h2>
      <CreateProduct onReload={renderProduct} />
      <ProductList render={reloadProduct} />
    </>
  );
};
export default Product;
