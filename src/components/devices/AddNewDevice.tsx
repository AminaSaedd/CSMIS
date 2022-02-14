import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Device } from '../../models/device';

const AddNewDevice = () => {

    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit = async (data: Device, e: any) => {
      e.preventDefault();
  
      const device = new Device();
      device.deviceModel= data.deviceModel
  
      const res = await axiosRequest(ENDPOINTS.Devices).post(device);
        console.log(res.status)
      e.target.reset();
    };
  return( <>


<div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
            Register  Divice 
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}  className="aligncenter">
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
              Name 
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="deviceModel"
                  id="deviceModel"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.deviceModel && <span>This field is required.</span>}
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
  </>);
};

export default AddNewDevice;
