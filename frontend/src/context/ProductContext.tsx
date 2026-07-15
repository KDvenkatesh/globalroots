import { createContext, useState, ReactNode } from "react";
import { Product } from "../types/product";
import { products as initialProducts } from "../data/products";

interface ProductContextType {
  products: Product[];

  addProduct: (product: Product) => void;

  deleteProduct: (id: number) => void;

  updateProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => { },
  deleteProduct: () => { },
  updateProduct: () => { },
});

interface Props {
  children: ReactNode;
}

export const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updated.id ? updated : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};