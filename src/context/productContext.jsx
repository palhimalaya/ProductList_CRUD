import { createContext, useContext, useState } from "react";
import { getProducts } from "../lib/productsApi";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getProductsFromApi = async () => {
    try {
      const responseData = await getProducts();
      setProducts(responseData);

      setFilteredData(responseData.products.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        filteredData,
        setFilteredData,
        getProductsFromApi,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);
export default ProductContextProvider;
