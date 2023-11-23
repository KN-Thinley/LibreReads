import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Axios from "axios";

function AdminRecommendations() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    Axios.get("/api/books/random")
      .then((response) => {
        setRecommendedBooks(response.data);

        console.log("Response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching recommendations: " + error);
      });
  }, []);

  const navigateToBookDetails = (isbn) => {
    window.location.href = `/admin/books/${isbn}`;
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h3"
        gutterBottom
        className="pt-4 px-8 border-b-2 border-b-[#82ca9f]"
      >
        Recommended
      </Typography>
      <div className="overflow-x-auto">
        <Grid container spacing={8} className="flex overflow-x-auto">
          {recommendedBooks.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.isbn}>
              <Card onClick={() => navigateToBookDetails(book.isbn)}>
                <CardMedia
                  component="img"
                  alt={book.title}
                  height="200"
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
  );
}

export default AdminRecommendations;
