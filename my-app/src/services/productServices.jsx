import { add, deletePrd, get, patch } from "../utils/request";

export const getProductList = async () => {
  const result = await get("products");
  return result;
};

// Thêm sản phẩm
export const addProduct = async (options) => {
  const result = await add("products", options);
  return result;
};
// xóa sản phẩm
export const deleteProduct = async (id) => {
  const result = await deletePrd(`products/${id}`);
  return result;
};
// sửa sản phẩm
export const patchProduct = async (options) => {
  const result = await patch("products", options);
  return result;
};
