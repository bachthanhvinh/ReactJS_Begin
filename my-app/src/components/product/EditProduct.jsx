import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { getCategoryList } from "../../services/categoryServices";
import { patchProduct } from "../../services/productServices";

const EditProduct = (props) => {
  const { onReload, itemProduct } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState(itemProduct);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getCategoryList();
      setCategory(result);
    };
    fetchAPI();
  }, [itemProduct]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const fetchAPI = async () => {
      const result = await patchProduct(data);
      if (result) {
        onReload();
        setShow(false);
        Swal.fire({
          title: "Cập nhật sản phẩm thành công!",
          icon: "success",
          draggable: true,
        });
      }
    };
    fetchAPI();
  };
  return (
    <>
      <button onClick={openModal} className="editProduct">
        Chỉnh sửa
      </button>
      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleEdit}>
          <table>
            <tbody>
              <tr>
                <td>Tiêu đề</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={data.title}
                    required
                  />
                </td>
              </tr>
              {category.length > 0 && (
                <tr>
                  <td>Danh mục</td>
                  <td>
                    <select
                      name="category"
                      onChange={handleChange}
                      value={data.category || ""}
                    >
                      {category.map((item, index) => (
                        <option key={index} value={item.slug}>
                          {item.slug}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}
              <tr>
                <td>Giá</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={data.price}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Giảm giá</td>
                <td>
                  <input
                    type="number"
                    name="discountPercentage"
                    onChange={handleChange}
                    value={data.discountPercentage}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Đường dẫn ảnh</td>
                <td>
                  <input
                    type="text"
                    name="thumbnail"
                    onChange={handleChange}
                    value={data.thumbnail}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td>
                  <textarea
                    rows={5}
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button type="button" onClick={closeModal}>
                    Hủy
                  </button>
                </td>
                <td>
                  <input type="submit" value={"Cập nhật"} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
};
export default EditProduct;
