import api from "../api/axios";

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProducts = async (page, size, sort) => {
  const response = await api.get("/products", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const searchProducts = async (keyword, page, size) => {
  const response = await api.get("/products/search", {
    params: {
      keyword,
      page,
      size,
    },
  });

  return response.data;
};

export const filterProducts = async (
  minPrice,
  maxPrice,
  categoryId,
  rating,
  page,
  size,
  sort,
) => {
  const response = await api.get("/products/filter", {
    params: {
      minPrice,
      maxPrice,
      categoryId,
      rating,
      page,
      size,
      sort,
    },
  });

  return response.data;
};
