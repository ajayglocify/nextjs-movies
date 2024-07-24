'use client';
import Image from "next/image";
import loginImage from '../../public/assets/img/login.webp'; // Adjust the path as necessary
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import {useForm} from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation'


export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const Data = (data) =>{
      if(data.cpasswords!=data.passwords){
        alert("Password Mismatch.");
        alert("fail");
        return false;
   }
  axios.post('/api/register',data)
  .then(function (response) {
    if(response.status==200){
      alert("Registartion Successful");
      router.push("/login")
    }else{
       alert(response.data.message);
    }
  })
  .catch(function (error) {
    console.log(error,'error');
  });
}


  return (
    <main className="container">
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form  className="mx-1 mx-md-4" onSubmit={handleSubmit(Data)}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input {...register("names", { required: true, maxLength: 20 })} id="form3Example1c" className="form-control"/>
                            <label className="form-label" for="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="email" {...register("emails", { required: true, maxLength: 20 })} id="form3Example3c" className="form-control"/>
                            <label className="form-label" for="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="password" {...register("passwords", { required: true, maxLength: 20 })} id="form3Example4c" className="form-control"/>
                            <label className="form-label" for="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="password" {...register("cpasswords", { required: true, maxLength: 20 })} id="form3Example4cd" className="form-control"/>
                            <label className="form-label" for="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <input type="submit" className="btn btn-primary btn-lg" value="Register" />
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <Image src={loginImage} className="img-fluid" alt="Sample image"  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
