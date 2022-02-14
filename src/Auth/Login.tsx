import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosRequest, ENDPOINTS } from "../api/config";
import { Credentials } from "../ViewModels/credentials";
import { UserInfo } from "../ViewModels/userInfo";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: Credentials, e: any) => {
    setIsLoading(true);

    e.preventDefault();

    const credentials: Credentials = {
      userName: data.userName,
      password: data.password,
    };

    const res = await axiosRequest(ENDPOINTS.Auth).post(credentials);
    if (res.status === 200) {
      var decode: any = jwtDecode(res?.data?.token);

      var userInfo: UserInfo = {
        name: decode?.name,
        userName: decode?.userName,
        token:res?.data?.token
      }

      localStorage.setItem("sys_user", JSON.stringify(userInfo));
      window.location.replace("/");
    } else {
      Swal.fire(
        "Oops",
        `${(res as any)?.response?.data?.message ?? "Invalid Credentials, please try again"}`,
        "error"
      );
    }
    console.log({ res });

    setIsLoading(false);
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-2">
                        Login
                      </h5>
                    </div>
                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Username
                        </label>
                        <div className="input-group has-validation">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="form-control"
                            ref={register({ required: true })}
                          />
                        </div>
                        <span className="text-danger">
                          {errors.userName && (
                            <span>This field is required.</span>
                          )}
                        </span>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          ref={register({ required: true })}
                        />
                        <span className="text-danger">
                          {errors.password && (
                            <span>This field is required.</span>
                          )}
                        </span>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-success w-100"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading" : "Login"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;