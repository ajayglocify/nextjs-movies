'use client';
import Image from "next/image";
import loginImage from '../../public/assets/img/login.webp'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.css';
import {useForm} from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Home() {
  const { register, handleSubmit,formState: { errors },setError} = useForm();
  const router = useRouter();
  const Data = (data) =>{
      if(data.cpasswords!=data.passwords){
        setError('passwords', {
          type: "manual",
          message: 'Password and Confirm password not matching.'
        })
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
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-5">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form  className="mx-1 mx-md-4" onSubmit={handleSubmit(Data)}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input placeholder="Your Name" 
                            {...register("names", 
                            { required: 'This field is required.', maxLength: {
                            value: 20, 
                            message: 'Maximum length is 20 characters.'
                          }  })} 
                          id="form3Example1c" className="form-control"/>
                          {errors.names && <span className='text-danger'>{errors.names.message}</span> }
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input placeholder="Your Email" type="email" 
                            {...register('emails', {required: 'Email is required',pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address',
                              },
                            })} 
                        id="form3Example3c" className="form-control"/>
                        {errors.emails && <span className='text-danger'>{errors.emails.message}</span> }
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input placeholder="Password" type="password" 
                          {...register("passwords", { required: 'This field is required.', maxLength: {value: 20,message: 'Maximum length is 20 characters.'} })} 
                          id="form3Example4c" className="form-control"/>
                           
                        {errors.passwords && <span className='text-danger'>{errors.passwords.message}</span> }
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input  placeholder="Confirm Password"  type="password" {...register("cpasswords", { required: 'This field is required.', maxLength: {value: 20,message: 'Maximum length is 20 characters.'} })} id="form3Example4cd" className="form-control"/>
                        {errors.cpasswords && <span className='text-danger'>{errors.cpasswords.message}</span> }
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <input type="submit" className="btn btn-primary btn-lg" value="Register" />
                        </div>

                      </form>

                    </div>

                    {/* <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <Image src={loginImage} className="img-fluid" alt="Sample image"  />
                    </div> */}

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
