import { useEffect } from "react";
import "./App.css";
import { useProductContext } from "./context/productContext";
import ProductList from "./components/ProductList";
import AddProductModal from "./components/AddProductModal";
import SearchProducts from "./components/SearchProducts";
import { ClimbingBoxLoader } from "react-spinners";

function App() {
  const { isLoading, getProductsFromApi } = useProductContext();

  useEffect(() => {
    getProductsFromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className="loading">
          <ClimbingBoxLoader color="#d67036" />
          <p>loading...</p>
          <p>
            It may take more time at start because the backend hosted on render
            free tier.
          </p>
        </div>
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
