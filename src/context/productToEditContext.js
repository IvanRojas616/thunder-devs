import { createContext, useContext } from 'react';

export const ProductToEditContext = createContext(null);

export const useProductToEdit = () => {
  return useContext(ProductToEditContext);
};