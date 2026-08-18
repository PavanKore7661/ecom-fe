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

export const getAllProducts = async () => {
    const response = await api.get("/products/all");
    return response.data;
};

export const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
};

export const createProduct = async (product) => {
    const response = await api.post("/products", product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const uploadProductImage = async (productId, image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await api.post(`/products/${productId}/image`,formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
};
