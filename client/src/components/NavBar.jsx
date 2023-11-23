import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import logo from "../img/logo.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Tooltip } from "@mui/material";



const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/books/books"); // Replace with your backend API endpoint
        const booksData = response.data; // Assuming your backend returns an array of books
        setBooks(booksData);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (event, newValue) => {
    
    if (newValue) {
      setSearchQuery(newValue.title);

      const query = newValue.title.toLowerCase();
      try {
        const response = await axios.get(`/api/books/search?query=${query}`); // Replace with your backend search API endpoint
        const matchingBookIds = response.data; // Assuming your backend returns an array of matching book IDs

        const filteredBooks = books.filter((book) => {
          return matchingBookIds.includes(book.id);
        });
        setSearchResults(filteredBooks);

      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const renderOption = (props, book) => {
    const query = searchQuery.toLowerCase();
    const title = book.title;
    const author = book.author;
    const cover = book.coverPage;
    const isbn = book.isbn;

    const titleParts = title.split(new RegExp(`(${query})`, "gi"));
    const authorParts = author.split(new RegExp(`(${query})`, "gi"));

  

    const handleBookClick = (event) => {
      const bookdId = event.currentTarget.getAttribute("data-book-id")
      window.location.href = `/books/${isbn}`;
    }

    return (
      <li {...props}>
        <div
          className="flex justify-center items-center"
          onClick={handleBookClick}
          data-book-id={book.id}
        >
           <img src={cover} alt="" className="h-12 w-12 pr-2" />
  
          <div>
            {titleParts.map((part, index) => (
              <span
                key={index}
                style={{
                  fontWeight: part.toLowerCase() === query ? "bold" : "normal",
                }}
              >
                {part}
              </span>
            ))}
            {" by "}
            {authorParts.map((part, index) => (
              <span
                key={index}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: part.toLowerCase() === query ? "bold" : "normal",
                }}
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      </li>
    );
  };

  return (
    <nav className="w-full flex justify-between p-4">
      <div className="flex">
        <Link to={"/"}>
          <img src={logo} alt="" className="h-16" />
        </Link>
      </div>
      <div className="flex items-center gap-4 w-1/3">
        <Tooltip title="Filter">
          <Link
            to={"/filter"}
            className="p-3 border border-[#82ca9f] rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#82ca9f"
              className="bi bi-funnel"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
            </svg>
          </Link>
        </Tooltip>
        <Tooltip title="Search Books">
          <Autocomplete
            options={books}
            getOptionLabel={(book) => `${book.title} by ${book.author}`}
            renderOption={renderOption}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
            onInputChange={(event, newValue) => {
              handleSearch(event, { title: newValue });
            }}
          />
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
