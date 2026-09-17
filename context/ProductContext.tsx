"use client";

import { Product } from "@/model/Product";
import { ProductDTO } from "@/model/ProductDTO";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ProductDTOContextProps {
  productsDTO: ProductDTO[];
  addToProductItems: (item: ProductDTO) => void;
  removeFromBasket: (uuid: string) => void;
  clearProductItems: () => void;
  updateQuantity: (uuid: string, quantity: number) => void;
  converProductToProductDTO: (product: Product) => ProductDTO;
  updateSelectedSize: (size: string) => void;
}

const ProductContext = createContext<ProductDTOContextProps | undefined>(undefined);

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsDTO, setProduct] = useState<ProductDTO[]>([]);
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    const savedProduct = localStorage.getItem("product");
    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(productsDTO));
  }, [productsDTO]);

  const addToProductItems = (item: ProductDTO) => {
    setProduct((prevProduct) => {
      const existingItem =
        prevProduct.find((productDTO) => productDTO.id === item.id && productDTO.size === item.size);

      if (existingItem) {
        return prevProduct.map((productDTO) =>
          productDTO.id === item.id && productDTO.size === item.size
            ? { ...productDTO, quantity: productDTO.quantity + 1 }
            : productDTO
        );
      }
      return [...prevProduct, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (uuid: string) => {
    setProduct((prevProduct) => prevProduct.filter((item) => item.uuid !== uuid));
  };

  const clearProductItems = () => {
    setProduct([]);
    localStorage.removeItem("product");
  };

  const updateQuantity = (uuid: string, quantity: number) => {
    setProduct((prevProduct) =>
      prevProduct.map((item) =>
        item.uuid === uuid ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const converProductToProductDTO = (product: Product): ProductDTO => {
    return {
      uuid: window.crypto.randomUUID(),
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: size
    };
  }

  const updateSelectedSize = (size: string) => {
    setSize(size)
  }

  return (
    <ProductContext.Provider
      value={{ productsDTO, addToProductItems, removeFromBasket, clearProductItems, updateQuantity, converProductToProductDTO, updateSelectedSize }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductItems = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductItems must be used within a ProductContextProvider");
  }
  return context;
};
