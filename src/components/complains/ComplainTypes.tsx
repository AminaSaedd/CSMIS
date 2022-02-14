import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { ComplainType } from "../../models/complainType";
const ComplainTypes = () => {


    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit = async (data: ComplainType, e: any) => {
      e.preventDefault();
  
      const complainTypes = new ComplainType();
      complainTypes.name= data.name
      complainTypes.description= data.description
  
      const res = await axiosRequest(ENDPOINTS.ComplainTypes).post(complainTypes);
      
      e.target.reset();
    };
  return( <>
 

 <div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
            Add  Complain Type
          </h5>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
              Name 
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.name && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            

            <div className="row mb-3">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Discription 
              </label>
              <div className="col-sm-10">
                <textarea
                  ref={register({ required: true })}
                  name="description"
                  id="description"
                  className="form-control"
                  style={{ height: 100 }}
                  defaultValue={""}
                />
                <span className="text-danger">
                  {errors.description && <span>This field is required.</span>}
                </span>
              </div>
            </div>

           

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="form-control  btn btn-info">
                Add 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>



  
  </>
  )};

export default ComplainTypes;
