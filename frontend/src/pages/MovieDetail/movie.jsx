import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        const { error, movieDetail } = response.data;
        if (error) {
          setError(error);
        } else {
          setMovie(movieDetail);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("An error occurred while fetching the movie details.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2>{movie.title}</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Rating:</strong> {movie.rate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;