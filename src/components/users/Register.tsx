import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { User } from '../../models/users';
import { createUser } from '../../ViewModels/createUser';

export default function Register() {

    const { register, handleSubmit, errors } = useForm();
     const[loading , setLoading] = useState(false);
    
      
    const onSubmit = async (data:createUser,e:any) => {
      e.preventDefault();
      const user = new createUser();
      user.name= data.name;
      user.userName= data.userName;
      user.password= data.password;
      
    const res = await axiosRequest(ENDPOINTS.Users).post(user);
  e.target.reset();
  if(res.status === 400){
    Swal.fire("🤷‍♀️", "user is alreayd exist .", "success");
  }

    }
  return (


  
      <div className="container card">
        <div className="card-body">
       
                <div className="pt-4 pb-2">
                  <h5 className="card-title  pb-0 fs-4">Create New User</h5>
                  <p className="text-center small"></p>
                </div>
                <form className="row g-3 needs-validation"
                
                onSubmit={handleSubmit(onSubmit)} 
                 noValidate>
                  <div className="col-6">
                    <label htmlFor="name" className="form-label"> Name</label>
                    <input type="text"
                     name="name" 
                     id="name"
                    className="form-control"
                    ref={register({ required: true })}
                     required />

                  </div>
                  <span className="text-danger">
                            {errors.name && (
                              <span>This field is required.</span>
                            )}
                          </span>
                  <div className="col-6">
                    <label htmlFor="userName" className="form-label">Username</label>
                  
                      <span className="input-group-text" id="inputGroupPrepend">@</span>
                      <input type="text" name="userName" 
                       ref={register({ required: true })}
                      className="form-control" id="userName" required />
                  
                  </div>
                  
                  <span className="text-danger">
                              {errors.userName && (
                                <span>This field is required.</span>
                              )}
                            </span>
                  <div className="col-6">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <input type="password" 
                    name="password" 
                    ref={register({ required: true })}
                    className="form-control" id="password" required />
                
                      
                     
                        
                      
                  </div>
                  <span className="text-danger">
                              {errors.password && (
                                <span>This field is required.</span>
                              )}
                            </span>
                  <div className="col-6">
                      <button className="btn btn-secondary w-100" type="submit" disabled={loading}>
                     Create
                      </button>
                    </div>
              
                  
                </form>
              </div>
            </div>
            
         
    
 



  );
}
