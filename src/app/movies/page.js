"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {Grid,Item} from '@mui/material';


export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchMovies();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
        <div className="container my-5">
      <div className="d-flex justify-content-between"><h1 className="mb-3">My Movies <Link href="/movies/add"><FaPlus /></Link></h1>
      <Link className="text-white" href={"/logout"}>Logout</Link>
      </div>


      

      
        <Grid container spacing={3}>
            {movies.length > 0 ? (
                movies.map((movie,index) => (
                  <Grid item xs={12} sm={12} md={4} xl={3} key={index}>
                    <Link href={`/movies/edit/${movie._id}`}>
                    <Image src={`https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg`} className="img-fluid" width={400} height={500}  alt={`${movie.title}`} />
                    <h5>{movie.title}</h5>
                    </Link>
                  </Grid>
                ))
            ) : (
              <Grid item xs={12}>You Movie List is Empty</Grid>
            )}
       </Grid>
    </div>
    </>

  );
}
