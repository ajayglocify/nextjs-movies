"use client";
import 'bootstrap/dist/css/bootstrap.css';
import {useForm} from "react-hook-form";
import axios from 'axios';
import {useRouter } from 'next/navigation';
import './../../../public/assets/css/login.module.css';
import Cookies from 'js-cookie';
import Image from 'next/image';


export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const Data = (data) =>{

      axios.post('/api/login',data)
      .then(function (response) {
        if(response.status === 200){
          alert(response.data.message);
          Cookies.set('AuthUser',response.data.token, { expires: 7 });
          router.push('/movies');
        }
      })
      .catch(function (error) {
        alert(error);
      });      
  }
  return (
    <main className="container">
    <section className="h-100 gradientform" style={{ backgroundColor: "#eee" }}>

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" width={185}
                          style={{width: "185px"}} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>

                      <form onSubmit={handleSubmit(Data)}>
                        <p>Please login to your account</p>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input {...register("emails", { required: true })} type="text" id="form2Example11" className="form-control"
                            placeholder="Phone number or email address" />
                          <label className="form-label" for="form2Example11">Username</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="password"  {...register("passwords", { required: true })} id="form2Example22" className="form-control" />
                          <label className="form-label" for="form2Example22">Password</label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <input  data-mdb-button-init data-mdb-ripple-init className={`btn btn-primary btn-block fa-lg gradientCustom2 mb-3`}  type="submit" value="Login" />
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className={`col-lg-6 d-flex align-items-center gradientCustom2`}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
