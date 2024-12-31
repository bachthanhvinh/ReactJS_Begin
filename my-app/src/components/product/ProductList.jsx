import { useEffect, useState } from "react";
import "./Product.scss";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/productServices";
const ProductList = (props) => {
  const { render } = props;
  const [data, setData] = useState([]);
  const [reLoad, setReload] = useState(false);

  const editLoadProduct = () => {
    setReload(!reLoad);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getProductList();
      setData(result.reverse());
    };
    fetchApi();
  }, [render, reLoad]);
  // console.log(data);
  return (
    <>
      <div className="product__list">
        {data.map((item) => (
          <div className="product__item" key={item.id}>
            <img src={item.thumbnail} alt="" className="product__thumbnail" />

            <div className="product__title">{item.title}</div>
            <div className="product__price">{item.price}$</div>
            <div className="product__discountPercentage">
              {item.discountPercentage}%
            </div>

            <EditProduct itemProduct={item} onReload={editLoadProduct} />
            <DeleteProduct itemProduct={item} onReload={editLoadProduct} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductList;
