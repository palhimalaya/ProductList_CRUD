import { useState } from "react";
import Modal from "./Modal";
import { useProductContext } from "../context/productContext";

const AddProductModal = () => {
  const { products } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const productLength = products.products.length;

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button className="add-button" onClick={openModal}>
        Add New Product
      </button>
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
          id={productLength + 1}
        />
      )}
    </div>
  );
};

export default AddProductModal;
