import { useState } from "react";
import { useProductContext } from "../context/productContext";

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { products, setFilteredData, filteredData } = useProductContext();

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);

    if (searchTerm === "") {
      setFilteredData(products.products);
    } else {
      const filtered = filteredData.filter((item) => {
        return (
          item.product_name.toLowerCase().includes(searchTerm) ||
          item.category_name.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredData(filtered);
    }
  };

  return (
    <form className="search-box">
      <input
        type="text"
        placeholder="Search by Product/Category"
        value={searchQuery}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchProducts;
