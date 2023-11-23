// BookDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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

  return (
    <div className="overflow-auto">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Book Details</h1>
        {book && (
          <div>
            <div className="pl-8 pt-8">
              <h2 className="text-left  text-2xl font-bold">{book.title}</h2>
              <small className="text-left flex gap-8 text-[#82ca9f] italic">
                <p>{id}</p>
                {book.author}
              </small>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;


