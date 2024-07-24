'use client';
import Image from "next/image";
import {useForm} from "react-hook-form";
import axios from "axios";
import React, { useCallback, useState ,useEffect } from 'react';
import '../../.././../../public/assets/css/movies/add.css';
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {oldData,setOldData} =  useState("");
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



    const { register, handleSubmit } = useForm();
    const [fileiMAGE, setFile] = useState(null);
    const router =  useRouter();
    const [backgroundImage,setBackgroundImage] = useState("");

    const handleFileChange = (e) => {
      const fileImageConatainer = document.getElementById('fileImageConatainer');
      fileImageConatainer.style.display = 'block';
      fileImageConatainer.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
      fileImageConatainer.style.backgroundSize = 'cover'; // Optional: Adjust as needed
      fileImageConatainer.style.backgroundPosition = 'center'; // Optional: Adjust as needed
      setFile(e.target.files[0]);
    };


  const Data = async (data) => {
        const formData = new FormData();
        formData.append('files',fileiMAGE);
        formData.append('title',data.title);
        formData.append('date',data.date);
        data.files = fileiMAGE;
        fetch('/api/movies', {
          method: 'POST',
          body: formData,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('File upload failed');
        })
        .then((result) => {
          alert("Added Successfully!");
          router.push('/movies');
          console.log(result, 'File uploaded successfully');
        })
        .catch((error) => {
          console.error('An error occurred while uploading the file:', error);
        });
  };
  

  return (
    <>
    <div className="container py-5">
      <div className="addMoviesBox col-lg-8">
          <h2 className="mb-5">Create a New Movie</h2>
          <form  onSubmit={handleSubmit(Data)}>
            <div className="row">
              <div className="col-lg-6" style={{position:'relative'}}>
              
                <div id="fileImageConatainer" style={{  width: '400px', height: '500px',border:'1px dotted #fff',position:'relative' }}>
                  <input style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)'}} type="file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="col-lg-6">
                <div data-mdb-input-init className="form-outline flex-fill mb-3">
                  <input type="text" {...register("title", { required: true, maxLength: 30 })} className="form-control" placeholder="Title" />
                </div>

                <div data-mdb-input-init className="form-outline flex-fill mb-3">
                  <input type="number"  {...register("date", { required: true })} className="form-control" placeholder="YYYY" min="2024" max="3024" />
                </div>

                <div>
                  <input type="reset" className="text-white bg-transparent ml-3 py-2 px-5"  value="Cancel" /><input className="text-white bg-success py-2 px-5" type="submit" value="Submit"  />
                </div>

              </div>
            </div>
          </form>
      </div>
    </div>
    </>
  );
}