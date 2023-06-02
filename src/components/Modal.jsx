import { useProductContext } from "../context/productContext";
import { addProducts } from "../lib/productsApi";
import { editProduct } from "../lib/productsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({
  setIsOpen,
  name,
  description,
  category,
  createdBy,
  status,
  setName,
  setCategory,
  setDescription,
  setStatus,
  setCreatedBy,
  id,
}) => {
  const { products, getProductsFromApi, isEdit, setIsEdit } =
    useProductContext();

  const resetValue = async () => {
    setIsOpen(false);
    setIsEdit(false);
    setName("");
    setCategory("");
    setDescription("");
    setStatus("");
    setCreatedBy("");
    id(0);
  };

  const AddProduct = async (e) => {
    e.preventDefault();

    const product = {
      id: id,
      product_name: name,
      category_name: category,
      description,
      created_by: createdBy,
      status,
    };

    try {
      await addProducts(product);
      await getProductsFromApi();
      toast.success("Product has been added successfully");
      await resetValue();
    } catch (error) {
      console.log(error);
    }
  };

  const EditProduct = async (e) => {
    e.preventDefault();
    const product = {
      id: id,
      product_name: name,
      category_name: category,
      description,
      status,
      created_by: createdBy,
    };
    try {
      await editProduct(product);
      await getProductsFromApi();
      toast.success("Product has been edited successfully");
      await resetValue();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = async () => {
    await resetValue();
  };

  const handleModalClick = async (e) => {
    e.stopPropagation();
  };
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <form className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              required
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {products.product_categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              value={description}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="createdBy">CreatedBy:</label>
            <input
              type="text"
              onChange={(e) => setCreatedBy(e.target.value)}
              id="createdBy"
              name="createdBy"
              value={createdBy}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              required
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>
                Select a status
              </option>
              {products.product_status.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {isEdit ? (
            <button type="submit" onClick={EditProduct}>
              Edit Product
            </button>
          ) : (
            <button type="submit" onClick={AddProduct}>
              Add Product
            </button>
          )}
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Modal;
