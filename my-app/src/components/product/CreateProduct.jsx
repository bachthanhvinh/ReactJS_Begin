import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { getCategoryList } from "../../services/categoryServices";
import { addProduct } from "../../services/productServices";

const CreateProduct = (props) => {
  const { onReload } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getCategoryList();
      setCategory(result);
    };
    fetchAPI();
  }, []);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchAPI = async () => {
      const result = await addProduct(data);
      if (result) {
        setShow(false);
        onReload();
        Swal.fire({
          title: "Tạo Sản phẩm thành công!",
          icon: "success",
          draggable: true,
        });
      }
    };
    fetchAPI();
  };
  return (
    <>
      <button onClick={openModal} className="createProduct">
        + Tạo sản phẩm
      </button>
      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Tiêu đề</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              {category.length > 0 && (
                <tr>
                  <td>Danh mục</td>
                  <td>
                    <select name="category" onChange={handleChange}>
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
                  <input type="submit" value={"Tạo mới"} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
};
export default CreateProduct;
