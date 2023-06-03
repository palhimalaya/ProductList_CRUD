import { useState } from "react";
import { useProductContext } from "../context/productContext";
import { deleteProduct } from "../lib/productsApi";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getStatus from "../lib/getStatus";

const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [id, setId] = useState(0);

  const { filteredData, setIsEdit, getProductsFromApi } = useProductContext();

  const openModal = async (product) => {
    setName(product.product_name);
    setCategory(product.category_name);
    setDescription(product.description);
    setStatus(getStatus(product.status));
    setCreatedBy(product.created_by);
    setId(product.id);
    setIsOpen(true);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      getProductsFromApi();
      toast.success("Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="table-body">
          {filteredData.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.category_name}</td>
              <td>{product.description}</td>
              <td>{product.created_at.substring(0, 10)}</td>
              <td>{getStatus(product.status)}</td>
              <td>
                <div className="table-button">
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button
                      className="delete-button"
                      onClick={() => {
                        const response = confirm(
                          "Are you sure you want to delete the product?"
                        );
                        if (response) {
                          handleDelete(product.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          name={name}
          category={category}
          description={description}
          status={status}
          createdBy={createdBy}
          setName={setName}
          setCategory={setCategory}
          setDescription={setDescription}
          setStatus={setStatus}
          setCreatedBy={setCreatedBy}
          id={id}
        />
      )}
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

export default ProductList;
