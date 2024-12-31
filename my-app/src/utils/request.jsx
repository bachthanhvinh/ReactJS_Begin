const API_DOMAIN = "http://localhost:3000/";

export const get = async (path) => {
  const res = await fetch(API_DOMAIN + path);
  const result = await res.json();
  return result;
};
// Thêm sản phẩm
export const add = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};
// xóa sản phẩm
export const deletePrd = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};
// sửa sản phẩm
export const patch = async (path, options) => {
  const res = await fetch(`${API_DOMAIN}${path}/${options.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = res.json();
  return result;
};
