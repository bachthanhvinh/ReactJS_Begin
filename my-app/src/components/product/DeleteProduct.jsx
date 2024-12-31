import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { deleteProduct } from "../../services/productServices";

const DeleteProduct = (props) => {
  const { onReload, itemProduct } = props;

  const deleteSuccess = async () => {
    const result = await deleteProduct(itemProduct.id);
    if (result) {
      Swal.fire({
        title: "Đã xóa!",
        text: "Bạn đã xóa sản phẩm thành công!",
        icon: "success",
      });
      onReload();
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Bạn đã chắc chắn xóa chưa?",
      text: "Bạn xóa sẽ không thể khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSuccess();
      }
    });
  };
  return (
    <>
      <button className="deleteProduct" onClick={handleDelete}>
        Xóa
      </button>
    </>
  );
};

export default DeleteProduct;
