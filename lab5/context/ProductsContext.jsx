import { createContext, useContext, useState } from "react";
import { initialProducts } from "../data/products";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  function getProductById(id) {
    return products.find((product) => product.id === String(id));
  }

  function addProduct(productData) {
    const newProduct = {
      id: String(Date.now()),
      ...productData,
    };

    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  }

  function updateProduct(id, productData) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === String(id)
          ? {
              ...product,
              ...productData,
            }
          : product
      )
    );
  }

  function deleteProduct(id) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== String(id))
    );
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts потрібно використовувати всередині ProductsProvider."
    );
  }

  return context;
}