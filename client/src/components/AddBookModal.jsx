import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import {toast} from 'react-toastify';

const AddBookModal = ({ open, handleClose }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    coverPage: "",
    downloadLink: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post("/api/books/add", book);

      if (response.status === 201) {
        toast.success(response.data); // Display success message from server
        handleClose(); // Close modal on success
      } else {
        toast.error("Failed to add book"); // Handle other error scenarios
      }

      // Close modal or handle success
      handleClose();
    } catch (error) {
      console.error("Error adding book:", error);
      if (error.response.status === 400){
        toast.error("All Fields are Required");
      }
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="p-16">
      <DialogTitle className="font-bold font-sans uppercase">Add Book</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cover Page"
            name="coverPage"
            value={book.coverPage}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Download Link"
            name="downloadLink"
            value={book.downloadLink}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={book.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} >Close</Button>
        <Button onClick={handleAddBook}>Add Book</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookModal;
