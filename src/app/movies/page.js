"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {FaSignOutAlt} from "@react-icons/all-files/fa/FaSignOutAlt";
import {Grid,Item, Box} from '@mui/material';
import '../../../public/assets/css/movies/list.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1;
  // Change page
  const handleChange = (event, value) => {
      setCurrentPage(value);
      alert(value);
  };
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
        setTotalPages(data.movies.length);
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
      <Box>
        <div className="d-flex justify-content-between align-item-center">
          <h1 className="mb-3 d-flex align-items-center">My Movies <Link  className="addMovieIcon ml-2" href="/movies/add"><FaPlus  style={{ marginLeft: '8px' }} /></Link></h1>
          <Link className="mb-3 logOutIcon" href={"/logout"}>Logout <FaSignOutAlt style={{ marginRight: '8px' }} /> </Link>
        </div>
      </Box>


      

      
      <Grid container spacing={2}>
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <Grid className="moviesGridBox"
            item
            xs={12}
            sm={12}
            md={4}
            xl={3}
            key={index}
            sx={{
              
            }}
          >
            <Link sx={{color:'#fff',textDecoration:'none!important'}} href={`/movies/edit/${movie._id}`} >
              <Box sx={{borderRadius: '10px',
                backgroundColor: '#224957',color:'#fff',padding:'10px' }}>
                  <Image
                    src={`https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg`}
                    width={280}
                    height={380}
                    alt={`${movie.title}`}
                  />
                  <h5 className="mt-2">{movie.title}</h5>
                  <p >{movie.date}</p>
              </Box>
            </Link>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          You Movie List is Empty
        </Grid>
      )}
    </Grid>

        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
    </div>
    </>

  );
}
