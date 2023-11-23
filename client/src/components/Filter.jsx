// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
// } from "@mui/material";
// import Axios from "axios";
// import NavBar from "./NavBar";

// function FilteredBooks() {
//   const [sortedBooks, setSortedBooks] = useState([]);
//   const [sortBy, setSortBy] = useState("title"); 
//   const [sortOrder, setSortOrder] = useState("asc"); 

//   const fetchSortedBooks = () => {
//     Axios.get(
//       `/api/books/sortBy${sortBy[0].toUpperCase() + sortBy.slice(1)}${
//         sortOrder === "desc" ? "Desc" : "Asc"
//       }`
//     )
//       .then((response) => {
//         setSortedBooks(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching sorted books: " + error);
//       });
//   };

//   useEffect(() => {
//     fetchSortedBooks();
//   }, [sortBy, sortOrder]);

//   const navigateToBookDetails = (isbn) => {
//     window.location.href = `/books/${isbn}`;
//   };

//   const handleSortBy = (newSortBy) => {
//     setSortBy(newSortBy);
//   };

//   const handleToggleSortOrder = () => {
//     const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newSortOrder);
//   };

//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center gap-8 pt-4 px-4">
//         <NavBar />
//         <h1 className="font-semibold text-7xl">
//           Welcome to <span className="font-thin text-[#82ca9f]">Libre</span>
//           <span className="font-black text-[#82ca9f]">Reads</span>
//         </h1>
//         <h2 className="font-normal text-2xl">
//           LibreReads is your free ebook library where you can download books
//           that are available in our collections.
//         </h2>
//       </div>
//       <div className="p-8 flex flex-col justify-center items-center gap-4 border-b-[#82ca9f]">
//         <Typography variant="h4" gutterBottom>
//           Filtered Books
//         </Typography>

//         <div className="mb-4 flex gap-12">
//           <button
//             onClick={() => handleSortBy("title")}
//             className="border-b border-b-green-500 px-4"
//           >
//             Title
//           </button>
//           <button
//             onClick={() => handleSortBy("author")}
//             className="border-b border-b-green-500 px-4"
//           >
//             Author
//           </button>
//           <Button
//             variant="outlined"
//             color="inherit"
//             onClick={handleToggleSortOrder}
//           >
//             {sortOrder === "asc" ? <p>&#11161;</p> : <p>&#11163;</p>}
//           </Button>
//         </div>
//         <div className="overflow-x-auto">
//           <Grid container spacing={8} className="flex overflow-x-auto">
//             {sortedBooks.map((book) => (
//               <Grid item xs={12} sm={6} md={3} key={book.isbn}>
//                 <Card onClick={() => navigateToBookDetails(book.isbn)}>
//                   <CardMedia
//                     component="img"
//                     alt={book.title}
//                     height="200"
//                     image={book.coverPage}
//                   />
//                   <CardContent>
//                     <Typography variant="h6" component="div">
//                       {book.title}
//                     </Typography>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       {book.author}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilteredBooks;

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Axios from "axios";
import NavBar from "./NavBar";
import { Tooltip } from '@mui/material';

function FilteredBooks() {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchSortedBooks = () => {
    Axios.get(
      `/api/books/sortBy${sortBy[0].toUpperCase() + sortBy.slice(1)}${
        sortOrder === "desc" ? "Desc" : "Asc"
      }`
    )
      .then((response) => {
        setSortedBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sorted books: " + error);
      });
  };

  useEffect(() => {
    fetchSortedBooks();
  }, [sortBy, sortOrder]);

  const navigateToBookDetails = (isbn) => {
    window.location.href = `/books/${isbn}`;
  };

  const handleSortBy = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sortOrder if the same sort field is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc"); // Set default order to ascending
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 pt-4 px-4">
        <NavBar />
        <h1 className="font-semibold text-7xl">
          Welcome to <span className="font-thin text-[#82ca9f]">Libre</span>
          <span className="font-black text-[#82ca9f]">Reads</span>
        </h1>
        <h2 className="font-normal text-2xl">
          LibreReads is your free ebook library where you can download books
          that are available in our collections{" "}
          <b className="text-[#82ca9f] underline">FOR FREE</b>.
        </h2>
      </div>
      <div className="p-8 flex flex-col justify-center items-center gap-4 border-b-[#82ca9f]">
        <Typography
          variant="h3"
          gutterBottom
          className="pt-4 px-8 border-b-2 border-b-[#82ca9f]"
        >
          Filtered Books
        </Typography>

        <div className="mb-4 flex gap-12">
          <Tooltip title="Sort by Title">
            <button
              onClick={() => handleSortBy("title")}
              className={`border-b border-b-green-500 px-4 ${
                sortBy === "title" ? "text-[#11161]" : ""
              }`}
            >
              {sortBy === "title" && sortOrder === "asc" ? (
                <p>Title &#11161;</p>
              ) : (
                <p>Title &#11163;</p>
              )}
            </button>
          </Tooltip>
          <Tooltip title="Sort by Author">
            <button
              onClick={() => handleSortBy("author")}
              className={`border-b border-b-green-500 px-4 ${
                sortBy === "author" ? "text-[#11161]" : ""
              }`}
            >
              {" "}
              {sortBy === "author" && sortOrder === "asc" ? (
                <p>Author &#11161;</p>
              ) : (
                <p>Author &#11163;</p>
              )}
            </button>
          </Tooltip>
        </div>
        <div className="overflow-x-auto">
          <Grid container spacing={10} className="flex overflow-x-auto">
            {sortedBooks.map((book) => (
              <Grid item xs={12} sm={6} md={3} key={book.isbn}>
                <Card onClick={() => navigateToBookDetails(book.isbn)}>
                  <CardMedia
                    component="img"
                    alt={book.title}
                    height="100"
                    image={book.coverPage}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default FilteredBooks;

