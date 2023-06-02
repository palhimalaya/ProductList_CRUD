import { useEffect } from "react";

import "./App.css";
import { useProductContext } from "./context/productContext";
import ProductList from "./components/ProductList";
import AddProductModal from "./components/AddProductModal";
import SearchProducts from "./components/SearchProducts";

function App() {
  const { isLoading, getProductsFromApi } = useProductContext();

  useEffect(() => {
    getProductsFromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="container">
          <div className=" compContainer">
            <div className="left">
              <AddProductModal />
            </div>
            <div className="right">
              <SearchProducts />
            </div>
          </div>
          <ProductList />
        </div>
      )}
    </main>
  );
}

export default App;
