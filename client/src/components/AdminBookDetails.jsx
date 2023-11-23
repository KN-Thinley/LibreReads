// BookDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";


const AdminBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
const [showConfirmation, setShowConfirmation] = useState(false);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [updatedBook, setUpdatedBook] = useState({
  title: "",
  author: "",
  coverPage: "",
  downloadLink: "",
  description: "",
});


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`); // Replace with your API endpoint
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/books/${id}`);
      if (response.status === 200) {
        toast.success("Book Deleted Successfully");
        navigate("/admin/home");
      }
    } catch (error) {
      console.error("Error Deleting Book:", error);
      toast.error("Error Deleting Book");
    }
  };

    const handleUpdateModalOpen = () => {
      setShowUpdateModal(true);
      setUpdatedBook(book); // Set initial values to the current book details
    };

    const handleUpdateModalClose = () => {
      setShowUpdateModal(false);
    };

    const handleUpdate = async () => {
      try {
        const response = await axios.put(`/api/books/${id}`, updatedBook);
        if (response.status === 200) {
          toast.success("Book Updated Successfully");
          setShowUpdateModal(false);
          // Optionally, fetch updated details again
          // setBook(response.data);
        }
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Error Updating Book");
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedBook({ ...updatedBook, [name]: value });
    };

  return (
    <div className="overflow-auto">
      <AdminNavbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Book Details</h1>
        {book && (
          <div>
            <div className="pl-8 pt-8">
              <h2 className="text-left  text-2xl font-bold">{book.title}</h2>
              <small className="text-left flex gap-8 text-[#82ca9f] italic">
                <p>{id}</p>
                <p>{book.author}</p>
              </small>

              <div className="py-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteConfirmation}
                >
                  Delete
                </button>
                <button
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdateModalOpen}
                >
                  Update
                </button>
                {showConfirmation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded shadow-lg">
                    <p>Are you sure you want to delete this book?</p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                      onClick={handleDelete}
                    >
                      Confirm Delete
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-2"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8 p-8">
              <div className="col-span-1">
                <img src={book.coverPage} alt="" className="w-full" />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl border-l-8 border-l-[#82ca9f] border-b border-b-[#82ca9f] pl-4">
                  About this eBook
                </h1>
                <p className="text-left">{book.description}</p>
                <p className="text-left">
                  <b>Download Link:</b>
                  <Link
                    to={book.downloadLink}
                    className="text-blue-500 hover:underline"
                  >
                    {book.downloadLink}
                  </Link>
                </p>
              </div>
            </div>
            <Dialog open={showUpdateModal} onClose={handleUpdateModalClose}>
              <DialogTitle>Update Book</DialogTitle>
              <DialogContent>
                <form>
                  <TextField
                    label="Title"
                    name="title"
                    value={updatedBook?.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Author"
                    name="author"
                    value={updatedBook?.author}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cover Page"
                    name="coverPage"
                    value={updatedBook?.coverPage}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Download Link"
                    name="downloadLink"
                    value={updatedBook?.downloadLink}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={updatedBook?.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleUpdateModalClose}>Cancel</Button>
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookDetails;
