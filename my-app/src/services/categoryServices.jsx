export const getCategoryList = async () => {
  const res = await fetch("http://localhost:3000/category");
  const result = await res.json();
  return result;
};
