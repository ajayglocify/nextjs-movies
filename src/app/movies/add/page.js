'use client';
import Image from "next/image";
import {useForm} from "react-hook-form";
import axios from "axios";
import React, { useCallback, useState } from 'react';
import '../../../../public/assets/css/movies/add.css';
import { useRouter } from 'next/navigation';
import Link from "next/link";
export default function Movies() {
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
        if(fileiMAGE){
          formData.append('files',fileiMAGE);
        }
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
      <div className="d-flex justify-content-between"><h1 className="mb-3">Create a New Movie</h1>
      <Link className="text-white" href={"/logout"}>Logout</Link>
      </div>
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